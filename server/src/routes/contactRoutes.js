import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public route - anyone can submit contact form
router.post('/', createContact);

// Admin routes - require authentication
router.get('/stats', protect, admin, getContactStats);
router.get('/', protect, admin, getContacts);
router.route('/:id')
  .get(protect, admin, getContactById)
  .put(protect, admin, updateContact)
  .delete(protect, admin, deleteContact);

export default router;
