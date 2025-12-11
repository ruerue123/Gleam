import User from '../models/User.js';

// @desc    Add product to favourites
// @route   POST /api/users/favourites/:productId
// @access  Private
export const addToFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if already in favourites
      const alreadyFavourited = user.favourites.find(
        (fav) => fav.toString() === req.params.productId
      );

      if (alreadyFavourited) {
        return res.status(400).json({ message: 'Product already in favourites' });
      }

      user.favourites.push(req.params.productId);
      await user.save();

      res.json({
        success: true,
        message: 'Product added to favourites',
        favourites: user.favourites
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove product from favourites
// @route   DELETE /api/users/favourites/:productId
// @access  Private
export const removeFromFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.favourites = user.favourites.filter(
        (fav) => fav.toString() !== req.params.productId
      );
      await user.save();

      res.json({
        success: true,
        message: 'Product removed from favourites',
        favourites: user.favourites
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user favourites
// @route   GET /api/users/favourites
// @access  Private
export const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favourites');

    if (user) {
      res.json({
        success: true,
        data: user.favourites
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
