const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ error: 'Email is already registered' });

            // Create a new user instance
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: 'User not found' });

            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) return res.status(401).json({ error: 'Invalid password' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res) => {
        // implement later using redis
    },
};

module.exports = authController;
