const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const authenticateUser = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const bearerToken = authorizationHeader.split(' ');
        const token = bearerToken[1];
        console.log('Token received from client:', token);

        if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.userId);
        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateUser;
