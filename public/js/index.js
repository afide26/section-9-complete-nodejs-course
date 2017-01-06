var socket = io();

socket.on('connect', function(){
  console.log("Connected to the server");

  socket.emit('newMessage', {
    from: "alan@egg.com",
    text:"Hello"
  })
});

socket.on('disconnect', function(){
  console.log("Disconnected from the server");
});


socket.on('createMessage', function(message){
  console.log('New Message', message);
});