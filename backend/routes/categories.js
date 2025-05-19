const express = require("express");
const router = express.Router();
const Categories = require("../models/Categories.js");


router.post("/", async (req, res) => {
    try {

        const data = req.body;
        const { title, img } = data;

        const newCategories = new Categories({ title, img });
        await newCategories.save();


        res.status(201).json(newCategories);


    } catch (error) {
        res.status(500).json("veri cekilirken hata olustu")
    }
})



router.get("/", async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});



router.get("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;
        const category = await Categories.findById(categoryID);

        res.status(200).json(category);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});



router.put("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;
        const updates = req.body;


        const updatedCategory = await Categories.findByIdAndUpdate(
            categoryID,
            updates,
            { new: true }
        )

      
        if (!updatedCategory) {
            return res.status(404).json({ error: "category is not found" });
        }


        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(500).json({ error: "server error" })
    }

});



router.delete("/:categoryID", async (req, res) => {
    try {
        const categoryID = req.params.categoryID;
        const removedCategory = await Categories.findByIdAndDelete(categoryID);

        if (!removedCategory) {
            return res.status(404).json({ error: "category is not found" });
        }

        res.status(200).json(removedCategory);

    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
})

module.exports = router;

