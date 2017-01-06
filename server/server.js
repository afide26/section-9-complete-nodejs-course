const express         = require('express');
const path            = require('path');
const socketIO        = require('socket.io');
const http            = require('http');

const publicPath      = path.join(__dirname, '../public');
var port              = process.env.PORT || 3000;
var app               = express();
var server            = http.createServer(app);
var io                = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');


  socket.emit('createMessage', {
    from:'alan@effs.com',
    text:'New Message from alan',
    createdAt: new Date().getDay()
  });

  socket.on('newMessage', (message)=>{
    console.log('newMessage', message)
  });




  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });
});





server.listen(port, ()=>{
  console.log(`Listening at port ${port}`);
});