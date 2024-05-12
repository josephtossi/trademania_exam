require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

// define routes here
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// front end
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chat/chat.html');
});

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

io.on('connection', socket => {
    console.log('User connected');

    // Listen for 'sendMessage' event from client
    socket.on('sendMessage', message => {
        console.log('Message received:', message);

        // Broadcast the message to all connected clients
        io.emit('receiveMessage', message);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));