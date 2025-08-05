// /routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route: GET /product/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render('product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route: POST /product/:slug/buy
router.post('/:slug/buy', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).send("Product not found");
    }

    if (product.stock > 0) {
      product.stock -= 1;
      await product.save();
      return res.redirect(`/product/${product.slug}`);
    } else {
      return res.send("Out of Stock");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});




module.exports = router;
