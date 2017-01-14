var socket = io();


function scrollToBottom(){
  // Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight      = messages.prop('clientHeight'); //.prop() is a jQuery method that is cross browser compatible
  var scrollTop         = messages.prop('scrollTop');
  var scrollHeight      = messages.prop('scrollHeight');
  var newMessageHeight  = newMessage.innerHeight(); //get the innerHeight of the element
  var lastMessageHeight = newMessage.prev().innerHeight();

  var combinedHeight    = [clientHeight, scrollTop, newMessageHeight, lastMessageHeight].reduce((a,b)=> a+b, 0);

  if(combinedHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function(){
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      alert("Welcome to the " + params.room +", " + params.name);
    }
  });

});

socket.on('disconnect', function(){
  console.log("Disconnected from the server");
});

socket.on('updateUserList', function(users){
  var ol = $('<ol></ol>');

  users.forEach(function(user){
    ol.append($('<li><strong></strong></li>').text(user))
  });

  $('#users').html(ol);

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
  scrollToBottom();
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
  scrollToBottom();
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
