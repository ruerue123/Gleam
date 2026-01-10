import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { collection, scentFamily, search, featured, isBestseller, productType, slug, limit } = req.query;

    let query = { isActive: true };

    // Filter by slug (for product detail page)
    if (slug) {
      query.slug = slug;
    }

    // Filter by scent family
    if (scentFamily) {
      query.scentFamily = scentFamily;
    }

    // Filter by collection (accept both collection name and slug)
    if (collection) {
      // Check if it's a collection name or slug
      query.$or = [
        { collection: collection },
        { collectionSlug: collection }
      ];
    }

    // Filter by product type (candle style)
    if (productType) {
      query.productType = productType;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Filter by bestseller
    if (isBestseller === 'true') {
      query.isBestseller = true;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    let productsQuery = Product.find(query);

    // Apply limit if specified
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery;

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id (accepts both slug and MongoDB ObjectId)
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    // Check if it's a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // It's an ObjectId, search by _id
      product = await Product.findById(id);
    } else {
      // It's a slug, search by slug
      product = await Product.findOne({ slug: id, isActive: true });
    }

    if (product) {
      res.json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (product) {
      res.json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Soft delete
      product.isActive = false;
      await product.save();

      res.json({
        success: true,
        message: 'Product removed'
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by collection
// @route   GET /api/products/collection/:slug
// @access  Public
export const getProductsByCollection = async (req, res) => {
  try {
    const products = await Product.find({
      collectionSlug: req.params.slug,
      isActive: true
    });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
