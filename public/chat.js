// Make Connection
var socket = io.connect( 'http://localhost:3000' );

// Emit Events
sendBTN.addEventListener( 'click', () => {
  socket.emit( 'message-from-clientside', { 
    'message': message.value ,
    'handle': handle.value
  } ); // second param is the data or what is the actual message.
} );

// emit a message to the server, that some one is write something now.
message.addEventListener( 'keypress', () => {
  socket.emit( 'typing', handle.value );
} );

// Listen For Events That Comes From The Server.
socket.on( 'message-from-serverside', ( data ) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + '</strong>: ' + data.message + '</p>';
} );

socket.on( 'typing', ( data ) => {
  feedback.innerHTML = '<p><em>' + data + ' Is Typing A Message...</em></p>';
} );