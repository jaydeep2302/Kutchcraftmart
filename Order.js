const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerID: String, // MongoDB _id use ho raha hai
  sellerID: String, // Seller ka _id store hoga
  products: [
    {
      productID: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: { type: String, default: "COD" },
  status: { type: String, default: "Pending" },
  placedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
