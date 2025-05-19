const express = require("express");
const Slider = require("../models/Slider");
const route = express.Router();


route.post("/", async (req, res) => {
    try {
        const slider = req.body;
        const newSlider = new Slider(slider);
        await newSlider.save();
        res.status(200).json(newSlider);
    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

route.get("/", async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json(sliders);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const removedSlider = await Slider.findByIdAndDelete(id);
        res.status(200).json(removedSlider);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

module.exports = route;