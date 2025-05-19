const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (req, res) => {
    try {


        const { username, email, password, } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "this email is already taken" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error" })
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "invalid password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        )

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});





module.exports = router;