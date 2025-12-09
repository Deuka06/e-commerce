import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST — жаңа курьер заказын жасау
export const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      address,
      institution,
      deliveryTo,
      description,
    } = req.body;

    const order = await prisma.courierOrder.create({
      data: {
        fullName,
        phoneNumber,
        address,
        institution,
        deliveryTo,
        description,
      },
    });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// GET — мекемелер тізімi
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await prisma.institution.findMany();
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching institutions' });
  }
};

// GET — админ үшін барлық заказдар
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.courierOrder.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
