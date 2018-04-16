var socket = io();

socket.on('connect', function() {
    console.log("YEP Connected to server");

    // socket.emit('createMessage', {
    //     to: 'server@example.com',
    //     text: 'Hey. This is the client'
    // });
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
});

socket.on('disconnect', function() {
    console.log("NAH Disconnected from server");
});