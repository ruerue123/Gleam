import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/database.js';

dotenv.config();

const products = [
  // Petty Collection
  {
    name: 'Blocked & Blessed',
    slug: 'blocked-and-blessed',
    description: 'For the peace that comes after cutting off negativity. Light this when you need to celebrate your boundaries.',
    price: 25.99,
    collection: 'Petty Collection',
    collectionSlug: 'petty-collection',
    scent: 'Sage & Sea Salt',
    burnTime: '45-50 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Essential oils', 'Cotton wick'],
    image: '/images/Petty/blocked-blessed.jpg',
    images: ['/images/Petty/blocked-blessed.jpg'],
    emoji: '🚫',
    stock: 50,
    featured: true
  },
  {
    name: 'Unbothered',
    slug: 'unbothered',
    description: 'The ultimate mood candle. For when you\'re too busy thriving to care about the noise.',
    price: 24.99,
    collection: 'Petty Collection',
    collectionSlug: 'petty-collection',
    scent: 'Lavender & Vanilla',
    burnTime: '40-45 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Essential oils', 'Cotton wick'],
    image: '/images/Petty/unbothered.jpg',
    images: ['/images/Petty/unbothered.jpg'],
    emoji: '😌',
    stock: 45,
    featured: false
  },

  // Soft Feelings
  {
    name: 'After the Cry',
    slug: 'after-the-cry',
    description: 'Warm and comforting. For those tender moments when you need to be gentle with yourself.',
    price: 26.99,
    collection: 'Soft Feelings',
    collectionSlug: 'soft-feelings',
    scent: 'Chamomile & Honey',
    burnTime: '50-55 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Natural fragrances', 'Cotton wick'],
    image: '/images/Soft/after-cry.jpg',
    images: ['/images/Soft/after-cry.jpg'],
    emoji: '🤗',
    stock: 40,
    featured: true
  },
  {
    name: 'Safe Space',
    slug: 'safe-space',
    description: 'Your sanctuary in candle form. Creates an atmosphere of peace and comfort.',
    price: 27.99,
    collection: 'Soft Feelings',
    collectionSlug: 'soft-feelings',
    scent: 'Vanilla & Sandalwood',
    burnTime: '45-50 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Essential oils', 'Cotton wick'],
    image: '/images/Soft/safe-space.jpg',
    images: ['/images/Soft/safe-space.jpg'],
    emoji: '🏡',
    stock: 35,
    featured: false
  },

  // Mood Collection
  {
    name: 'Main Character Energy',
    slug: 'main-character-energy',
    description: 'For when you\'re the protagonist of your own story. Bold, confident, and unapologetic.',
    price: 28.99,
    collection: 'Mood Collection',
    collectionSlug: 'mood-collection',
    scent: 'Citrus & Bergamot',
    burnTime: '45-50 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Essential oils', 'Cotton wick'],
    image: '/images/Mood/main-character.jpg',
    images: ['/images/Mood/main-character.jpg'],
    emoji: '✨',
    stock: 42,
    featured: true
  },
  {
    name: 'Fresh Start',
    slug: 'fresh-start',
    description: 'Clean, crisp, and full of possibility. Perfect for new beginnings and clearing your energy.',
    price: 26.99,
    collection: 'Mood Collection',
    collectionSlug: 'mood-collection',
    scent: 'Eucalyptus & Mint',
    burnTime: '40-45 hours',
    size: '8 oz',
    ingredients: ['Soy wax', 'Essential oils', 'Cotton wick'],
    image: '/images/Mood/fresh-start.jpg',
    images: ['/images/Mood/fresh-start.jpg'],
    emoji: '🌱',
    stock: 38,
    featured: false
  },

  // Luxe Gleam
  {
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Luxury in a jar. Warm, rich, and sophisticated. For those who know their worth.',
    price: 35.99,
    collection: 'Luxe Gleam',
    collectionSlug: 'luxe-gleam',
    scent: 'Amber & Oud',
    burnTime: '60-65 hours',
    size: '10 oz',
    ingredients: ['Premium soy blend', 'Fine fragrances', 'Wooden wick'],
    image: '/images/Luxe/golden-hour.jpg',
    images: ['/images/Luxe/golden-hour.jpg'],
    emoji: '🌅',
    stock: 30,
    featured: true
  },
  {
    name: 'Royal Treatment',
    slug: 'royal-treatment',
    description: 'Because you deserve to feel like royalty. Opulent, elegant, and unforgettable.',
    price: 38.99,
    collection: 'Luxe Gleam',
    collectionSlug: 'luxe-gleam',
    scent: 'Rose & Champagne',
    burnTime: '60-65 hours',
    size: '10 oz',
    ingredients: ['Premium soy blend', 'Fine fragrances', 'Wooden wick'],
    image: '/images/Luxe/royal-treatment.jpg',
    images: ['/images/Luxe/royal-treatment.jpg'],
    emoji: '👑',
    stock: 25,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    console.log('Products deleted');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@gleam.com' });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@gleam.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created');
    }

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
