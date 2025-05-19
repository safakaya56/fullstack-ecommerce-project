const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

router.get("/:paramEmail", async (req, res) => {
    try {
        const { paramEmail } = req.params;
        const foundUser = await User.findOne({ email: paramEmail });
        if (!foundUser) return res.status(404).json({ error: "User not found" });

        const { email, username, password } = foundUser;
        res.status(200).json({ email, username, password });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});



router.post("/", async (req, res) => {
    try {


        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "this email is already taken" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" })
    }
})




router.put("/:paramEmail", async (req, res) => {
    try {
        const { paramEmail } = req.params;
        const { email, username, password, oldPassword } = req.body;


        const user = await User.findOne({ email: paramEmail });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        const updateData = {};

        if (username) {
            updateData.username = username;
        }

        if (email) {
            updateData.email = email;
        }


        if (oldPassword && password) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Incorrect old password" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }


        const updatedUser = await User.findOneAndUpdate(
            { email: paramEmail },
            updateData,
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});




router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const removedUser = await User.findOneAndDelete({ email });

        res.status(200).json(removedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
})


module.exports = router;