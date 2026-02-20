import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
async function getProducts(req, res) {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...category });

    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
async function createProduct(req, res) {
  try {
    const { name, price, brand, category, countInStock, description, image } = req.body;

    const product = new Product({
      name: name || 'Sample Name',
      price: price || 0,
      user: req.user._id,
      image: image || '/images/sample.jpg',
      brand: brand || 'Sample Brand',
      category: category || 'Sample Category',
      countInStock: countInStock || 0,
      numReviews: 0,
      description: description || 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
async function updateProduct(req, res) {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: product._id });

    res.json({ message: 'Product removed' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
async function createProductReview(req, res) {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
