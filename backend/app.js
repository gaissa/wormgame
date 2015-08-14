var express = require('express');
var path = require('path');
var _ = require('lodash');
var moment = require('moment');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

// Static path for reading the html from frontend folder
app.use(express.static('../frontend'));
// Static path for reading the bower_components
app.use('/assets', express.static( '../frontend/bower_components'));

// Get the index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '  /index.html');
});

// Track players joined in the lobby
var players = [];

// When player opens the web page
io.on('connection', function (socket) {
  console.log('Player connected with id: ' + socket.id);
  console.log(players);
  // Get current players for the UI
  io.emit('players:get', players);

  // When player joins the actual lobby
  socket.on('player:add', function (data, fn) {
    console.log('Added new player');

    // Check if client exists
    var playerExists = _.some(players, function(val) {
      return val.id == socket.id;
    });

    if (playerExists) {
      console.log('Player already joined in the lobby!');
      fn(null, false);
    } else {
      players.push({ id: socket.id, name: data.name });
      fn({ id: socket.id, name: data.name }, true);
      // Emit to everybody else that a player has joined
      socket.broadcast.emit('player:joined', { id: socket.id, name: data.name });      
    }
  });

  // When player joins the actual lobby
  socket.on('chat:newmessage', function (data, fn) {

    // Check if client exists
    var playerExists = _.some(players, function(val) {
      return val.id == socket.id;
    });

    // If the socket exists, send a message
    if (playerExists) {
      fn({ id: socket.id, sender: data.sender, message: data.message }, true);
      socket.broadcast.emit('chat:messagesent', { id: socket.id, sender: data.sender, message: data.message, timestamp: moment(new Date()).format('h:mm:ss') });  
    } else {
      fn(null, false);          
    }

  });

  socket.on('disconnect', function() {
    console.log('Player disconnected');

    var socketIndex = _.findIndex(players, function(player) {
      return player.id === socket.id;
    });

    players.splice(socketIndex, 1);
    console.log(players)
    // Get current players for the UI
    io.emit('players:get', players);
  });
});
