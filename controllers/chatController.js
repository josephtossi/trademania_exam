const Message = require('../models/messageModel');

const chatController = {
    sendMessage: async (req, res, next) => {
        try {
            const { content } = req.body;
            const sender = req.user; // Assuming user object is available in req
            const receiver = 'ALL';
            // Save message to MongoDB
            const message = new Message({ sender, receiver, content });
            await message.save();
            // Send message to group page
            req.app.io.to(receiver).emit('receiveMessage', { sender, content }); // Emit sender object instead of content only
            res.status(200).json({ message: 'Message sent successfully' });
        } catch (error) {
            next(error);
        }
    },
    getChatHistory: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            // Retrieve chat history for the user
            const chatHistory = await Message.find({ receiver: userId }).populate('sender');
            res.status(200).json({ chatHistory });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = chatController;