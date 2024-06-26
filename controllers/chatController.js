const Message = require('../models/messageModel');
const User = require('../models/userModel');

const chatController = {
    sendMessage: async (req, res, next) => {
        try {
            const { content, receiverId } = req.body;
            const senderId = req.userId;
            const senderMap = await User.findById(senderId);
            const receiverMap = await User.findById(receiverId);

            if (receiverMap) {
                // in case a file is uploaded
                let fileUrl = '';
                if (req.file) {
                    const baseUrl = `${req.protocol}://${req.get('host')}`;
                    fileUrl = `${baseUrl}/chat/uploads/${req.file.filename}`;
                }

                // Save message to MongoDB
                const message = new Message({
                    sender: senderMap,
                    receiver: receiverMap,
                    content: content,
                    fileUrl: fileUrl
                });
                await message.save();

                // Send message to page
                req.app.io.to(receiverId).emit('receiveMessage', {
                    sender: senderMap,
                    receiver: receiverId,
                    content: content,
                    fileUrl: fileUrl
                });
                res.status(200).json({ message: 'Message sent successfully' });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    },
    getChatHistory: async (req, res, next) => {
        try {
            const userId = req.userId;
            const chatHistory = await Message.find({ receiver: userId });
            res.send({ user: { "id": userId, "chatHistory": chatHistory } })
        } catch (error) {
            next(error);
        }
    },
    getFile: async (req, res, next) => {
        try {
            const filename = req.params.filename;
            res.sendFile(filename, { root: 'uploads' });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = chatController;