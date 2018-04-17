const path          = require('path');
const http          = require('http');

const publicPath    = path.join(__dirname, '../public');
const port          = process.env.PORT || 3000;

const socketIO      = require('socket.io');
const express       = require('express');
var engines         = require('consolidate');

var app             = express();
var server          = http.createServer(app);
var io              = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to chat app') );

    socket.broadcast.emit('newMessage',  generateMessage('Admin','New user joined the chat') );

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        
        //socket.emit emites an event to a single connection (to himself)
        //io.emit emites an event to every single connection (inluding himself)
        //socket.broadcast emits an event to every one BUT himself

        io.emit('newMessage',  generateMessage( message.from, message.text) );
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', 
                generateLocationMessage('Admin', coords.latitude, coords.longitude)
        );
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
