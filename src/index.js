const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
require('dotenv').config();


const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
  socket.broadcast.emit('message', {text: 'new user'});

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('message', data => {
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    socket.emit('message', {text: 'user left'});
  });
});

server.listen(PORT, () => console.log(`Server started, port: ${PORT}`));
