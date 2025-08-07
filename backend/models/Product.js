// /models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  slug: String, // unique identifier in URL
  description: String,
  
  images: [String],
  features: [String],
  price: Number,
  inBox: [String],

  originalPrice: Number,
  stock: Number // ✅ Available stock
});

module.exports = mongoose.model("Product", productSchema);










