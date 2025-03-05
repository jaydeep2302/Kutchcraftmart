const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    gstNumber: { type: String, unique: true },
    businessName: String,
    address: String,
    bankAccount: String,
    ifsc: String,
    sellerID: { type: String, unique: true },
    password: String,
}, { timestamps: true });
module.exports = mongoose.model('Seller', SellerSchema);