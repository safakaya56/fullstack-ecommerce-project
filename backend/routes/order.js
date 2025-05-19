const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/", async (req, res) => {
    try {
        const order = await Order.find()
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.get("/:customer_email", async (req, res) => {
    try {
        const { customer_email } = req.params;
        const order = await Order.find({ customer_email })
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newOrder = new Order(data);
        await newOrder.save();

        res.status(200).json(newOrder);


    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

router.delete("/:customer_email", async (req, res) => {
    try {
        const { customer_email } = req.params;
        const order = await Order.findOneAndDelete({ customer_email })
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})

module.exports = router;