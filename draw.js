/* jslint browser:true */
/* global $, global, canvas, keyboard, println */

var dragging = false;
var currentX = 0;
var currentY = 0;

var putPoint = function (event) {
    if (dragging) {
        var line = {
            type: 'line',
            startX: currentX,
            startY: currentY,
            endX: event.clientX - canvas.xOffset,
            endY: event.clientY - canvas.yOffset,
            width: global.radius * 2,
            color: global.drawColor
        };

        canvas.drawObject(line);
        canvas.addToStack(line);

        currentX = event.clientX - canvas.xOffset;
        currentY = event.clientY - canvas.yOffset;

        var dot = {
            type: 'dot',
            x: currentX,
            y: currentY,
            radius: global.radius,
            color: global.drawColor
        };

        canvas.drawObject(dot);
        canvas.addToStack(dot);
    }
};

var engage = function (event) {
    if (keyboard.textMode) {
        global.hideTabs('all');
        var val = $('.text.input').val();

        var text = {
            type: 'text',
            text: val,
            x: event.clientX - canvas.xOffset,
            y: event.clientY - canvas.yOffset,
            font: keyboard.textSize.toString() + 'pt Sans-serif',
            color: global.drawColor
        };

        canvas.drawObject(text);
        canvas.addToStack(text);
        keyboard.textMode = false;

    } else if (global.anyOpenTabs()) {
        global.hideTabs('all');
    } else {
        dragging = true;
        currentX = event.clientX - canvas.xOffset;
        currentY = event.clientY - canvas.yOffset;
        putPoint(event);
    }
};

var disengage = function (event) {
    putPoint(event);
    dragging = false;
};

var startTouch = function (event) {
    event.preventDefault();
    var touches = event.changedTouches;
    var mockEvent = {
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
    };
    engage(mockEvent);
};

var endTouch = function (event) {
    event.preventDefault();
    var touches = event.changedTouches;
    var mockEvent = {
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
    };
    disengage(mockEvent);
};

var dragTouch = function (event) {
    event.preventDefault();
    var touches = event.changedTouches;
    var mockEvent = {
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
    };
    putPoint(mockEvent);
};

canvas.obj.addEventListener('mousemove', putPoint);
canvas.obj.addEventListener('mousedown', engage);
canvas.obj.addEventListener('mouseup', disengage);
canvas.obj.addEventListener('mouseleave', disengage);

canvas.obj.addEventListener('touchmove', dragTouch);
canvas.obj.addEventListener('touchstart', startTouch);
canvas.obj.addEventListener('touchend', endTouch);