import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, qty } = req.body;
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { qty: existing.qty + Number(qty || 1) },
      });
      return res.json(updated);
    }
    const item = await prisma.cartItem.create({
      data: { userId, productId: Number(productId), qty: Number(qty || 1) },
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.cartItem.deleteMany({ where: { userId } });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
