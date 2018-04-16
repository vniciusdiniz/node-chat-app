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

app.use(express.static(publicPath));
// app.set('views', publicPath);
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

// app.get('/', (req, res) => {
//     res.render('home.html');
// });

io.on('connection', (socket) => {
    console.log('New user connected');
    // console.log(socket.id);

    // socket.emit('newMessage', {
    //     from: "server@example.com",
    //     text: 'Hi client, how is goin?',
    //     createAt: 45822558
    // });


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        
        //socket.emit emites an event to a single connection
        //io.emit emites an event to every single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
