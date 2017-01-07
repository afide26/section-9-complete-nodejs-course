const express            = require('express');
const path               = require('path');
const socketIO           = require('socket.io');
const http               = require('http');

const {messageGenerator} = require('./utils/message.js');
const publicPath         = path.join(__dirname, '../public');
var port                 = process.env.PORT || 3000;
var app                  = express();
var server               = http.createServer(app);
var io                   = socketIO(server);

var Admin                = "Admin: Alan";


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage', messageGenerator('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', messageGenerator('Admin', 'New user joined!'));

  socket.on('createMessage', (message)=>{
    console.log('createMessage', message);
    io.emit('newMessage', messageGenerator(message.from, message.text));
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });
});





server.listen(port, ()=>{
  console.log(`Listening at port ${port}`);
});