import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  const cats = await prisma.category.findMany({ include: { products: true } });
  res.json(cats);
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const cat = await prisma.category.create({ data: { name } });
  res.json(cat);
};
