const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

// Middleware: Verify Token & Extract Buyer ID
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, "SECRET_KEY"); // Replace with .env key
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// 🛒 Place Order Route with JWT Auth
router.post("/place", verifyToken, async (req, res) => {
  try {
    const buyerID = req.user._id; // Token se buyer ki ID fetch ki
    const { sellerID, products, address, paymentMethod } = req.body;

    // Total Price Calculation
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productID);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if (product.stock < item.quantity) return res.status(400).json({ error: "Insufficient stock" });

      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      buyerID,
      sellerID,
      products,
      totalPrice,
      address,
      paymentMethod: paymentMethod || "COD"
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
