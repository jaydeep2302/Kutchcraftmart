const express = require('express');
const Seller = require('../models/Seller');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");
const { registerSeller, } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerSeller);

router.post("/login", async (req, res) => {
  try {
    const { sellerID, emailOrPhone, password } = req.body;

    if (!sellerID || !emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find seller by Seller ID and Email/Phone
    const seller = await Seller.findOne({
      sellerID,
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!seller) {
      return res.status(400).json({ message: "Seller not found." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign({ sellerID: seller.sellerID }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Protected Route - Fetch Seller Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const seller = await Seller.findOne({ sellerID: req.seller.sellerID }).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller);
  } catch (error) {
    console.error("Error fetching seller details:", error);
    res.status(500).json({ message: "Server error" });
  }
}); 

router.put("/profile/update", authMiddleware, async (req, res) => {
  try {
    const sellerID = req.seller.sellerID; // Get sellerID from token
    const { name, email, phone, password } = req.body; // Get password

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required for verification." });
    }
    

    // Find seller by sellerID
    const seller = await Seller.findOne({ sellerID });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Verify password before updating
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password. Update denied." });
    }

    // Update profile if password is correct
    const updatedSeller = await Seller.findOneAndUpdate(
      { sellerID },
      { name, email, phone },
      { new: true }
    );

    res.json({ message: "Profile updated successfully", seller: updatedSeller });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}); 
module.exports = router;