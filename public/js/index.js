var socket = io();

socket.on('connect', function(){
  console.log("Connected to the server");

});

socket.on('disconnect', function(){
  console.log("Disconnected from the server");
});

// JQUERY
socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template      = $('#message-template').html();
  var html          = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  $("#messages").append(html);

});


// NEW Location Message
socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template      = $('#location-message-template').html();
  var html          = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt:formattedTime,
    url: message.url
  });

  $("#messages").append(html);
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
