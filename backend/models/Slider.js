const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema(
    {
        image: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;