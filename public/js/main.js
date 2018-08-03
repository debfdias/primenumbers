var socket = io.connect(window.location.hostname);

socket.on('value', function (data) {
    //$('#count').html(data.value);
    if(data.value!=0)
    	document.getElementById('count').innerHTML = data.value + " | " + document.getElementById('count').innerHTML;
    
});

$('#start').click(function() {
    socket.emit('click:start');
});

$('#stop').click(function() {
    socket.emit('click:stop');
});

$('#reset').click(function() {
	socket.emit('click:stop');
    socket.emit('click:reset');
    document.getElementById('count').innerHTML = " - ";
});

$('#refresh').click(function() {
	socket.emit('click:reset');
    document.getElementById('count').innerHTML = " - ";
    socket.emit('click:start');
});