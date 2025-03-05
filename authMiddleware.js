const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findOne({ sellerID: decoded.sellerID });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    
    req.seller = decoded; // Attach seller data to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
