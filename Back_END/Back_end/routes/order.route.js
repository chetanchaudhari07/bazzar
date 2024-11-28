const express = require("express");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const authenticateToken = require("../middleware/checkAccess");

const router = express.Router();


router.post("/", authenticateToken, async (req, res) => {
  const { buyer, items } = req.body;

  if (!buyer || !buyer.name || !buyer.contactInfo || !buyer.address) {
    return res.status(400).json({ message: "Buyer details are required." });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "At least one item is required." });
  }

  try {
    
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return res.status(400).json({ message: "Some products do not exist." });
    }

  
    const newOrder = new Order({
      buyer,
      items: items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      status: "Pending", 
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

module.exports = router;
