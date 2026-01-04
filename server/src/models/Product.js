import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  collection: {
    type: String,
    required: true,
    enum: ['EMBER', 'ZEST', 'SERENE', 'ROOT']
  },
  collectionSlug: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'candle'
  },
  scent: {
    type: String,
    required: true
  },
  scentFamily: {
    type: String,
    enum: ['EMBER', 'ZEST', 'SERENE', 'ROOT'],
    required: false
  },
  scentFamilyDescription: {
    type: String,
    required: false
  },
  bestFor: {
    type: String,
    required: false
  },
  burnTime: {
    type: String,
    default: '40-50 hours'
  },
  size: {
    type: String,
    default: '8 oz'
  },
  ingredients: [{
    type: String
  }],
  image: {
    type: String,
    required: false
  },
  images: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  emoji: {
    type: String,
    default: '🕯️'
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', scent: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
