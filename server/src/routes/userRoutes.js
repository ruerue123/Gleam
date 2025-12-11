import express from 'express';
import {
  addToFavourites,
  removeFromFavourites,
  getFavourites
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/favourites')
  .get(protect, getFavourites);

router.route('/favourites/:productId')
  .post(protect, addToFavourites)
  .delete(protect, removeFromFavourites);

export default router;
