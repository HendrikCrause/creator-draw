var socket = null;
var collaborate = collaborate || {};
collaborate.server = 'http://live-creatordraw.rhcloud.com:8000/';
collaborate.host = 'http://creatordraw.com/app?live=';
collaborate.connected = false;
collaborate.room = null;

$('.button.collaborate').click(function () {
    if (collaborate.room) {
        showConnectedSuccess();
    } else {
        popup.show('collaborate');
    }
});

$('.action.createroom').click(function () {

    if (!socket) {
        createSocket();
    }

    if (!collaborate.connected) {
        socket.connect();
    }

    var roomname = guid();

    socket.emit('create room', roomname, function (response) {
        if (response === 'success') {
            collaborate.status = true;
            collaborate.room = roomname;

            for (var i = 0; i < canvas.stack.length; i++) {
                collaborate.sendShape(canvas.stack[i]);
            }

            showConnectedSuccess();
        } else {
            popup.alert('An error occurred while trying to connect to the live drawing server. Please try again...');
        }
    });
});

$('.action.disconnect').click(function () {
    popup.cancel();
    if (socket) {
        socket.emit('leave');
        collaborate.room = null;
        popup.show('collaborate');
    }
});

$('.action.joinroom').click(function () {
    popup.show('collaborate-join');
});

$('.action.join').click(function () {
    var roomname = $('#connection-join').val();

    collaborate.join(roomname);
});

collaborate.join = function (roomname) {
    if (!socket) {
        createSocket();
    }

    socket.emit('join room', roomname, function (response) {
        if (response === 'success') {
            collaborate.room = roomname;
            showConnectedSuccess();
            canvas.clearCanvas();
        } else {
            popup.alert('An error occurred while trying to connect to the live drawing server. The most probable reasons are: <ul><li>You entered an invalid connection code or,</li> <li>The session you are trying to connect to has been closed and therefor no longer exists</li></ul>');
            collaborate.connected = false;
        }

    });
};

collaborate.sendShape = function (obj) {
    socket.emit('new shape', obj, function (response) {
        if (response === 'success') {} else {
            popup.alert('An error occurred while trying to send information to the live drawing server.');
        }
    });
};

collaborate.clearCanvas = function () {
    if (collaborate.room) {
        socket.emit('clear');
    }
};

function showConnectedSuccess() {
    $('#connection-code').val(collaborate.room);
    $('#connection-link-anchor').attr('href', collaborate.host + collaborate.room);
    $('#connection-link').html(collaborate.host + collaborate.room);

    popup.show('collaborate-connected');
}

function createSocket() {
    socket = io.connect(collaborate.server, {
        'reconnection': false
    });

    socket.on('connect', function () {
        collaborate.connected = true;
    });

    socket.on('connect_error', function () {
        popup.alert('An error occurred while trying to connect to the live drawing server.');
        collaborate.connected = false;
    });

    socket.on('add shape', function (shape) {
        canvas.drawObject(shape, true);
        canvas.addToStack(shape);
    });

    socket.on('clear', function () {
        canvas.clearCanvas();
    });

    socket.on('error', function () {
        popup.alert('An error occurred while communicating to the live drawing server.');
    });
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}