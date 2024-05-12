const express = require('express');
const router = express.Router();

// controllers
const chatController = require('../controllers/chatController');

// helpers
const authenticateUser = require('../helpers/authMiddleware');

router.post('/send-message', authenticateUser, chatController.sendMessage);
router.get('/chat-history', authenticateUser, chatController.getChatHistory);

module.exports = router;