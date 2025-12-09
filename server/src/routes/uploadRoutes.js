import express from 'express';
import { upload } from '../controllers/uploadController.js';
const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

export default router;
