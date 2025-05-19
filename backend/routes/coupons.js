const express = require("express");
const router = express.Router();
const Coupons = require("../models/Coupons");

router.post("/", async (req, res) => {
    try {
        const { code, discountPercentage } = req.body;
        const newCoupon = new Coupons({ code, discountPercentage });
        await newCoupon.save();

        res.status(201).json(newCoupon);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const coupons = await Coupons.find();
        res.status(200).json(coupons);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.get("/:code", async (req, res) => {
    try {
        const code = req.params.code;
        const foundCoupon = await Coupons.findOne({ code });

        res.status(200).json(foundCoupon);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error)
    }
});

router.put("/:couponID", async (req, res) => {
    try {
        const couponID = req.params.couponID;
        const updates = req.body;

        const updatedCoupon = await Coupons.findByIdAndUpdate(
            couponID,
            updates,
            { new: true }
        );

        res.status(200).json(updatedCoupon);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.delete("/:couponID", async (req, res) => {
    try {
        const couponID = req.params.couponID;

        const removedCoupon = await Coupons.findByIdAndDelete(couponID);

        res.status(200).json(removedCoupon);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

module.exports = router;