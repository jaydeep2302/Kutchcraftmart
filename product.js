const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["online", "offline"], // Only allows "online" or "offline"
    default: "online",
  },
  image: {
    type: String, // Stores image path
    default: "",
  },
  sellerID: {
    type: String, // Stores the unique seller ID (not _id)
    required: true,
    index: true, // Makes it easy to search/filter by seller
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
