require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const path = require('path');

const authenticateUser = require('./helpers/authMiddleware');

// define routes here
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

// access in routes/controllers
app.io = io;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// front end ( for testing purposes )
app.get('/sign-up', (req, res) => res.sendFile(__dirname + '/views/sign_up/signUp.html'));
app.get('/sign-in', (req, res) => res.sendFile(__dirname + '/views/sign_in/signIn.html'));

// backend routes
app.use('/auth', authRoutes);
app.use('/chat', authenticateUser, chatRoutes);

io.on('connection', socket => {
    console.log('User connected');
    socket.on('sendMessage', message => {
        console.log('Message received:', message);
        io.emit('new message', message);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));