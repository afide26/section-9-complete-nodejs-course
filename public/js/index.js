var socket = io();

socket.on('connect', function(){
  console.log("Connected to the server");

});

socket.on('disconnect', function(){
  console.log("Disconnected from the server");
});

// JQUERY
socket.on('newMessage', function(message){
  console.log('New Message', message);
  var formattedTime = moment(message.createdAt).format("MMM DD, YYYY - h:mm a");
  var li = $('<li></li>');
  li.text(message.from + ": " + message.text + " - " + formattedTime);

  $("#messages").append(li);

});


// NEW Location Message
socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = $('<li></li>');
  var a = $('<a target="_blank"><i class="glyphicon glyphicon-globe"></i> My current location</a>');


  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  li.append(" - " + formattedTime);

  $("#messages").append(li);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val("");
  });
});

var locationButton = $("#send-location");

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('No geolocation available');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to locate location');
  });
});
