const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).send("Product not found");
  res.render('product', { product });
});

module.exports = router;
