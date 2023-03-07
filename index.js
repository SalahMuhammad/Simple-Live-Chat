var express = require( 'express' );
var socket  = require( 'socket.io' );

// App setup
var app = express();
var server = app.listen( 3000, () => {
  console.log( 'Listening To Requests On Port 3000' );
} );

// Static Files
app.use( express.static( 'public' ) );

app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/views/index.html' );
} );

  // Socket Setup
  var io = socket( server );

  // each onnection is going to have own socket between that client and the server.
  io.on( 'connection', ( socket ) => {
    console.log( 'Made Socket Connection... Connection ID Is', socket.id );

    // listen for that message being sent to us from the clients, chat message.
    // data is the second param in client-side's sockce.emit()
    socket.on( 'message-from-clientside', ( data ) => {
      // send it out to all of the different clients connected to the server on a web socket.
      // this is going to refer to all of the sockets that are connected to the server.
      io.sockets.emit( 'message-from-serverside', data );
    } );

    // handle typing event from clientside, then send it back to all connected people except one that typing now.
    socket.on( 'typing', ( data ) => {
      socket.broadcast.emit( 'typing', data );
    } );
  } );