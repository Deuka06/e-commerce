import express from 'express';
import {
  createOrder,
  getInstitutions,
  getAllOrders,
} from '../controllers/courierController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     CourierOrder:
 *       type: object
 *       required:
 *         - fullName
 *         - phoneNumber
 *         - address
 *         - institution
 *         - deliveryTo
 *       properties:
 *         id:
 *           type: integer
 *         fullName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *         institution:
 *           type: string
 *         deliveryTo:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     Institution:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Courier
 *   description: Courier order management
 */

/**
 * @swagger
 * /api/courier:
 *   post:
 *     summary: Create new courier order (protected)
 *     tags: [Courier]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourierOrder'
 *     responses:
 *       201:
 *         description: Order successfully created
 */
router.post('/', protect, createOrder);

/**
 * @swagger
 * /api/courier/institutions:
 *   get:
 *     summary: Get list of institutions (protected)
 *     tags: [Courier]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of institutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 */
router.get('/institutions', protect, getInstitutions);

/**
 * @swagger
 * /api/courier:
 *   get:
 *     summary: Get all courier orders (admin only)
 *     tags: [Courier]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all courier orders
 */
router.get('/', protect, adminOnly, getAllOrders);

export default router;
