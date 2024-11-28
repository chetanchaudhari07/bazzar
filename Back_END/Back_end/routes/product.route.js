const express = require("express");
const Product = require("../models/product.model");
const auth = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");
const router = express.Router();

// Fetch product catalog
router.get("/", async (_, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add product (Admin only)
router.post("/", auth, checkAccess("admin"), async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update product (Admin only)
router.put("/:id", auth, checkAccess("admin"), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete product (Admin only)
router.delete("/:id", auth, checkAccess("admin"), async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
