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

var serverCanvas = {
  canvasDrawings: []
};

const SOCKET_MAX = 3;
var socketCounter = 0;
// Set max time for occupation to 3s
var lock = new AsyncLock({maxOccupationTime: 3000}); 

// When a new socket connects
function onConnection(socket) {
  // Acquire shared lock 
  lock.acquire('socket_lock', function(done) {
    console.log("Socket connected!");
    if (socketCounter < SOCKET_MAX) {
      socketCounter++;
      socket.on('drawing', (data) => {
        serverCanvas.canvasDrawings.push(data);
        socket.broadcast.emit('drawing', data)
      });
      socket.on('client_disconnect', () => {
        console.log("Client disconnected.");
      });
      socket.emit('update_canvas', serverCanvas);
    }
    else {
      socket.emit('max_users'); 
      socket.disconnect(); 
    }
    done(err, ret);
  }, function(err, ret) {
    socket.disconnect(); 
    // TODO: Make emit to socket 
    console.log("Socket error in connecting."); 
});
  
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));