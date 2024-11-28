const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  stock: { type: Number },
  category: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;