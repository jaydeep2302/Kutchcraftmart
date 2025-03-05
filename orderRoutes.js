const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Get Orders by SellerID (Using Token)
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("seller data :", req.seller);
    const sellerID = req.seller.sellerID; // ✅ Token se sellerID mila
    const orders = await Order.find({ sellerID }); // ✅ MongoDB se filter kiya
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update Order Status (Using Token)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
