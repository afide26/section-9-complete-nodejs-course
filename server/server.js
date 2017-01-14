const express            = require('express');
const path               = require('path');
const socketIO           = require('socket.io');
const http               = require('http');

const {messageGenerator,
generateLocationMessage} = require('./utils/message.js');
const {isRealString}     = require('./utils/validation.js');
const {Users}            = require('./utils/users.js');
const publicPath         = path.join(__dirname, '../public');
var port                 = process.env.PORT || 3000;
var app                  = express();
var server               = http.createServer(app);
var io                   = socketIO(server);

var Admin                = "Admin Says...";
var users                = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');



  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room) ){
      return callback('Name and roomname are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', messageGenerator(Admin, 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', messageGenerator(Admin, `${params.name} has joined!`));
    callback();
  });


  socket.on('createMessage', (message,callback)=>{
    console.log('createMessage', message);
    io.emit('newMessage', messageGenerator(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', messageGenerator(Admin, `${user.name} has left!`));
    }
  });
});


server.listen(port, ()=>{
  console.log(`Listening at port ${port}`);
});