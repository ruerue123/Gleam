import express from 'express';
import { upload } from '../config/cloudinary.js';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Upload single image
router.post('/single', protect, admin, upload.single('image'), uploadImage);

// Upload multiple images
router.post('/multiple', protect, admin, upload.array('images', 10), uploadMultipleImages);

// Delete image
router.delete('/:publicId', protect, admin, deleteImage);

export default router;
