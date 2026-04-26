import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: "User exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashed });
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({ success: true, token, user: { fullName: user.fullName, email: user.email, userId: user._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({ success: true, token, user: { fullName: user.fullName, email: user.email, userId: user._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.get('/verify', auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user: { fullName: user.fullName, email: user.email, userId: user._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default userRouter;