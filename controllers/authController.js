const User = require('../models/userModel');

const authController = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ error: 'Email is already registered' });

            // Create a new user instance
            const newUser = new User({ username, email, password });
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

            // todo : add JWT token and auth using helpers
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res) => {
        // implement later
    },
};

module.exports = authController;
