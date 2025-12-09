import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
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
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (protected)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get('/', protect, getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID (public)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product (admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 */
router.post('/', protect, adminOnly, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 */
router.put('/:id', protect, adminOnly, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 */
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
