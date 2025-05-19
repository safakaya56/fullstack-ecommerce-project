const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        customer_email: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        discount: { type: Number, required: true },
        selected_color: { type: String, required: true },
        selected_size: { type: String, required: true },
    },
    {
        timestamps: true
    }

)

const Product = mongoose.model("Order", orderSchema);
module.exports = Product;