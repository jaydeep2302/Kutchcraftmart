const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, address });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// 🔥 Login API
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // ✅ Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No account found ❌" });
      }
  
      // ✅ Compare Passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials ❌" });
      }
  
      // ✅ Generate JWT Token
      const token = jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", {
        expiresIn: "10h",
      });
  
      res.status(200).json({ message: "Login successful ✅", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error ❌" });
    }
  });
  const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], "SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ✅ 1️⃣ Fetch User Profile
router.get("/user/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ 2️⃣ Update User Profile (Password Confirmation)
router.put("/user/profile", authMiddleware, async (req, res) => {
    const { name, email, profilePicture, confirmPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 🛑 Password Confirmation Check
        const isMatch = await bcrypt.compare(confirmPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        // ✅ Update Profile Fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
