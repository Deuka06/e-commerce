import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    // get cart items
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    if (!items.length) return res.status(400).json({ message: 'Cart empty' });
    const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((it) => ({
            productId: it.productId,
            price: it.product.price,
            qty: it.qty,
          })),
        },
      },
      include: { items: true },
    });
    // clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
