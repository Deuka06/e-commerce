import express from 'express';
import { addToCart, getCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/', protect, clearCart);

export default router;
