const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(400).json({ error: "Email already in use" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
});

module.exports = router;
