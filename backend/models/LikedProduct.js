const mongoose = require("mongoose");

const productSchema = mongoose.Schema
    (
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: {
                current: { type: Number, required: true },
                discount: { type: Number, default: 0 }
            },
        },
        {
            _id: false
        },
        {
            timestamps: true,
        }
    );

const userAndLikedSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        likedProducts: [productSchema]

    },

);

const UserAndLiked = mongoose.model("UserAndLiked", userAndLikedSchema);
module.exports = UserAndLiked;