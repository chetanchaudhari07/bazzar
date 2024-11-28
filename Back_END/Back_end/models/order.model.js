const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: {
        name: String,
        contactInfo: String,
        address: String,
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Delivered"],
        default: "Pending",
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
