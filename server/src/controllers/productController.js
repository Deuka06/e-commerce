import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, image } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: stock ? Number(stock) : 0,
        categoryId: categoryId ? Number(categoryId) : null,
        image,
      },
    });

    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, stock, categoryId, image } = req.body;

    const exists = await prisma.product.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Product not found' });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? Number(price) : exists.price,
        stock: stock ? Number(stock) : exists.stock,
        categoryId: categoryId ? Number(categoryId) : exists.categoryId,
        image,
      },
    });

    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const exists = await prisma.product.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Product not found' });

    await prisma.product.delete({ where: { id } });

    res.json({ message: 'Product deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
