var socket = io();

socket.on('connect', function() {
    console.log("YEP Connected to server");
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
    console.log("NAH Disconnected from server");
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox =  jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationBtn = document.querySelector('#send-location');
locationBtn.addEventListener('click', function(){
    if (!navigator.geolocation){
        return alert('Geolocation not suported by your browser.');
    }

    locationBtn.disabled = true;
    locationBtn.text ='Sending location...';

    navigator.geolocation.getCurrentPosition(function(position){
        locationBtn.disabled = false;
        locationBtn.text ='Send location';

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationBtn.disabled = false;
        locationBtn.text ='Send location';
        alert('Unable to fetch location.');
    });
});