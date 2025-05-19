const express = require("express");
const UserAndLiked = require("../models/LikedProduct");
const router = express.Router();

router.get("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const userAndLiked = await UserAndLiked.findOne({ email });
        if (!userAndLiked) {
            return res.status(404).json("User not found")
        }
        res.status(200).json(userAndLiked)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
});

router.post("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { id, name, image, price } = req.body;
        let isUser = await UserAndLiked.findOne({ email });

        if (!isUser) {
            isUser = new UserAndLiked({
                email: email,
                likedProducts: []
            });
            isUser.likedProducts.push({ id, name, image, price });
            await isUser.save();
            return res.status(200).json(isUser)
        }

        const alreadyFav = isUser.likedProducts.some(p =>
            p.name === name &&
            p.image === image &&
            p.price.current === price.current
        );

        if (alreadyFav) {
            return res.status(400).json("This product is already in favorites.");
        }

        isUser.likedProducts.push({ id, name, image, price });
        await isUser.save();

        res.status(200).json(isUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:email/:productId", async (req, res) => {
    try {
        const { email, productId } = req.params;

        const isUser = await UserAndLiked.findOne({ email });
        if (!isUser) {
            return res.status(404).json({ error: "User not found." });
        }


        isUser.likedProducts.pull({ id: productId });
        await isUser.save();

        return res.status(200).json({ message: "Product removed from favorites.", user: isUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;