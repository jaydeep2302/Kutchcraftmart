require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const productroutes = require('./routes/productRoutes');
const orderroutes = require('./routes/orderRoutes');
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
// Connect to MongoDB
connectDB();


// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/product', productroutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderroutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
