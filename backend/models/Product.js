const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        colors: { type: String, required: true },
        sizes: { type: String, required: true },
        price: {
            current: { type: Number, required: true },
            discount: { type: Number, default: 0 }
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            require: true
        }

    },
    {
        timestamps: true
    }

)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;