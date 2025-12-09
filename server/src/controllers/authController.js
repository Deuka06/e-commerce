import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });
    return res.json({ id: user.id, email: user.email, name: user.name });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    // Save refresh token
    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id },
    });

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    });

    // Return complete auth response
    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.revoked)
      return res.status(401).json({ message: "Invalid refresh token" });
    const jwtLib = await import("jsonwebtoken");
    const refreshPayload = jwtLib.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: refreshPayload.id },
    });
    if (!user) return res.status(401).json({ message: "User not found" });
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    return res.json({ accessToken });
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (token) {
      await prisma.refreshToken.updateMany({
        where: { token },
        data: { revoked: true },
      });
    }
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
