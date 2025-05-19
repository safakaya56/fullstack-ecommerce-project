const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
    {
        code: { type: String, required: true },
        discountPercentage: { type: Number, required: true }
    },
    {
        timestamps: true
    }

)

const Coupons = mongoose.model("Coupons", couponSchema);
module.exports = Coupons;