var AsyncLock = require('async-lock');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// Serve the React html
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Store the drawings emitted by users, to be redrawn for new users
var serverCanvas = {
  canvasDrawings: []
};

const SUCCESS_CODE = "success";
// Set a max socket limit
const SOCKET_MAX = 5;
var socketCounter = 0;
// Set max time for lock occupation to 3s (i.e. time spent in lock)
var lock = new AsyncLock({maxOccupationTime: 3000}); 

// When a socket disconnects
function onDisconnect(socket) {
  lock.acquire('socket_lock', function(done) {
    try {
      socket.disconnect();
      console.log("Client disconnected.");
      socketCounter--;
      done(SUCCESS_CODE);
    } catch (err) {
      done(new Error(err));
    }
  }, function(result) {
    console.log("Connected Sockets: ", socketCounter);
    if (result !== SUCCESS_CODE) {
      console.log("Socket error in disconnecting.");
    }
  });
}

// When a new socket connects
function onConnection(socket) {
  // Acquire shared lock 
  lock.acquire('socket_lock', (done) => {
    try {
      // Check if space is available
      if (socketCounter < SOCKET_MAX) {
        // Listen to sockets when they emit 'drawing' to broadcast to others
        socket.on('drawing', (data) => {
          serverCanvas.canvasDrawings.push(data);
          socket.broadcast.emit('drawing', data)
        });
        // Listen to client disconnection
        socket.on('disconnect', () => {
          console.log("Disconnect attempt");
          onDisconnect(socket);
        });
        // For new connections, emit the current canvas to render it for new users
        socket.on('request_canvas', () => {
          console.log("Socket requested canvas.");
          socket.emit('update_canvas', serverCanvas);
        });
        // Inform client that they are connected
        socket.emit('successful_connection');
        socketCounter++;
        done(SUCCESS_CODE);
      }
      else {
        // Otherwise, inform socket of max users
        console.log("Socket rejected. Max socket users.");
        socket.emit('max_users'); 
        socket.disconnect();
        done("max users"); 
      }
    } catch (err) {
      // Throw an error 
      done(new Error(err));
    }
  }, (result) => {
    if (result === SUCCESS_CODE) {
      console.log("Socket connected!");
      console.log("Connected Sockets: ", socketCounter);
    } else if (result instanceof Error) {
      // If an error was encountered in connecting the socket.
      console.log("ERROR: ", err);
      // Disconnect the socket in case of an error
      socket.emit('server_error');
      socket.disconnect(); 
      // TODO: Make emit to socket 
      console.log("Socket error in connecting."); 
    }
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));