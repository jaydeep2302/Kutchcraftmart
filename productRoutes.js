const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const Seller = require('../models/Seller');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
    try {

      console.log("Authenticated Seller Data:", req.seller); // 🔍 Debugging Step

      const sellerID = req.seller.sellerID; // ✅ Extract Only sellerID
  
      if (!sellerID) {
        return res.status(400).json({ success: false, message: "Seller ID missing" });
      }

      const { name, description, price, category, stock, type } = req.body; // Added type
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock,
        type, // Save Online/Offline status
        image: imagePath,
        sellerID,
      });
  
      await newProduct.save();
      res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error adding product" });
    }
  });
  
  router.get("/all", async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

  router.get("/display", authMiddleware, async (req, res) => {
    try {
      
      console.log("Authenticated Seller Data:", req.seller); // 🔍 Debugging Step

      const sellerID = req.seller.sellerID; // ✅ Extract Only sellerID
  
      if (!sellerID) {
        return res.status(400).json({ success: false, message: "Seller ID missing" });
      } // Fetch only the seller's products

      const products = await Product.find({ sellerID });

      if (!products) {
        return res.status(404).json({ message: "No products found" });
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
      const { name, price, category, image, description, stock, type } = req.body;
      const product = await Product.findOne({ _id: req.params.id, sellerID: req.seller.sellerID });
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      // Update fields only if they are provided
      if (name) product.name = name;
      if (price) product.price = price;
      if (category) product.category = category;
      if (image) product.image = image;
      if (description) product.description = description;
      if (stock) product.stock = stock;
      if (type) product.type = type;
  
      await product.save();
      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  router.post("/delete", authMiddleware, async (req, res) => {
    try {
      const { productIDs, password } = req.body;
  
      // Validate required fields
      if (!productIDs || !Array.isArray(productIDs) || productIDs.length === 0) {
        return res.status(400).json({ success: false, message: "No products selected for deletion" });
      }
      if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
      }
  
      const sellerID = req.seller.sellerID; // Extract sellerID from token
  
      if (!sellerID) {
        return res.status(400).json({ success: false, message: "Seller ID missing" });
      }
  
      // Find the seller in the database
      const seller = await Seller.findOne({ sellerID });
  
      if (!seller) {
        return res.status(404).json({ success: false, message: "Seller not found" });
      }
  
      // Compare password (hashed)
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
  
      // Delete selected products that belong to this seller
      const result = await Product.deleteMany({ _id: { $in: productIDs }, sellerID });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: "No products found or unauthorized action" });
      }
  
      res.json({ success: true, message: "Products deleted successfully" });
    } catch (error) {
      console.error("Error deleting products:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Error fetching products" });
    }
});

router.get("/latest", async (req, res) => {
  try {
      const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
      res.json(latestProducts);
  } catch (error) {
      console.error("Error fetching latest products:", error);
      res.status(500).json({ message: "Server error" });
  }
});

  module.exports = router;