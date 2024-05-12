const Message = require('../models/messageModel');

const chatController = {
    sendMessage: async (req, res) => {
        try {
            const { sender, receiver, content } = req.body;
            // Save message to database
            const message = new Message({ sender, receiver, content });
            await message.save();
            // Emit event to sender and receiver clients
            req.app.io.emit('receiveMessage', content);
            res.status(200).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getChatHistory: async (req, res) => {
    },
};

module.exports = chatController;
