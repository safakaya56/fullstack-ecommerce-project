const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.post("/", async (req, res) => {
    try {

        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.log(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const product = await Product.find().populate("category", "title");
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.get("/:productID", async (req, res) => {
    try {
        const productId = req.params.productID;
        const foundProduct = await Product.findById(productId);

        res.status(200).json(foundProduct);

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});

router.put("/:productID", async (req, res) => {
    try {
        const productID = req.params.productID;
        const updates = req.body;

        if (!productID) {
            res.status(404).json("product is not found");
        }


        const updatedProduct = await Product.findByIdAndUpdate(
            productID,
            updates,
            { new: true }
        );


        res.status(200).json(updatedProduct);


    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
});


router.delete("/:productID", async (req, res) => {
    try {
        const productID = req.params.productID;
        const removedProduct = await Product.findByIdAndDelete(productID);

        if (!productID) {
            res.status(404).json("product is not found");
        }

        res.status(200).json(removedProduct)

    } catch (error) {
        res.status(500).json({ error: "server error" });
        console.error(error);
    }
})




router.get("/search/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const foundedProducts = await Product.find({
            name: { $regex: name, $options: "i" }
        })
        res.status(200).json(foundedProducts);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "server error" })
    }
})





module.exports = router;