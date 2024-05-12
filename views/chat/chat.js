// Establish WebSocket connection with server
const socket = io();

// Event listener for message form submission
document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message !== '') {
        // Send message to server
        socket.emit('sendMessage', message);
        // Clear message input field
        messageInput.value = '';
    }
});

// Event listener for receiving messages
socket.on('receiveMessage', (message) => {
    // Display message in chat interface
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
});
