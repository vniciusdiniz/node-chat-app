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
    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    });

});



server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
