const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname)); // Serves your HTML file

let players = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('move', (data) => {
        players[socket.id] = data;
        // Broadcast all player positions to everyone
        io.emit('playerUpdate', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
        console.log('User disconnected:', socket.id);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
