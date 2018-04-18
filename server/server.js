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

const   {   generateMessage, 
            generateLocationMessage }   = require('./utils/message'),
        { isRealString }                = require('./utils/validation.js'),
        { Users }                       = require ('./utils/users');

var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if( !isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }
        
        socket.join(params.room);
        //socket.leave(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin','Welcome to chat app') );

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`) );
        
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        
        //socket.emit emites an event to a single connection (to himself)
        //io.emit emites an event to every single connection (inluding himself)
        //socket.broadcast emits an event to every one BUT himself

        if (user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',  generateMessage( user.name, message.text) );
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', 
            generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }

    });

    socket.on('disconnect', () => {
        var user  = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.` ));
        }
    });

});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
