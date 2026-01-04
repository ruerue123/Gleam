import express from 'express';
import {
  subscribe,
  unsubscribe,
  getSubscribers,
  getSubscriberStats,
  exportSubscribers,
  deleteSubscriber
} from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes - anyone can subscribe/unsubscribe
router.post('/', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes - require authentication
router.get('/stats', protect, admin, getSubscriberStats);
router.get('/export', protect, admin, exportSubscribers);
router.get('/', protect, admin, getSubscribers);
router.delete('/:id', protect, admin, deleteSubscriber);

export default router;
