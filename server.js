const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const axios = require("axios");
const authRoutes = require("./routes/authRoutes");
const Order = require("./routes/order")
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use("/api", authRoutes);
app.use("/order ", Order)
//
app.get("/api/product", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/product"); // Updated seller backend port to 5000
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

app.get("/api/product/latest", async (req, res) => {
  try {
      const { data } = await axios.get("http://localhost:5000/api/product/latest");
      res.json(data);
  } catch (error) {
      console.error("Error fetching latest products:", error);
      res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
