const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// controllers
const chatController = require('../controllers/chatController');

// helpers
const authenticateUser = require('../helpers/authMiddleware');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/send-message', authenticateUser, upload.single('file'), chatController.sendMessage);
router.get('/chat-history', authenticateUser, chatController.getChatHistory);
router.get('/uploads/:filename', chatController.getFile);

module.exports = router;