/* jslint browser:true */
/* global $, println */

var global = global || {};

var canvas = canvas || {};

canvas.obj = document.getElementById('canvas');
canvas.context = canvas.obj.getContext('2d');

canvas.xOffset = 0;
canvas.yOffset = 0;

canvas.backgroundColor = '#eee';

canvas.stack = [];
canvas.setSize = function (height, width) {
    canvas.xOffset = $('#canvas').css('left').slice(0, -2);
    canvas.yOffset = $('#canvas').css('top').slice(0, -2);

    canvas.obj.height = height - canvas.yOffset;
    canvas.obj.width = width - canvas.xOffset;

    canvas.context.fillStyle = canvas.backgroundColor;
    canvas.context.strokeStyle = canvas.backgroundColor;
    canvas.context.fillRect(0, 0, width, height);

    // println(canvas.obj.width + ' x ' + canvas.obj.height);
};

canvas.drawDot = function (x, y, radius, color) {
    canvas.context.fillStyle = color;
    canvas.context.beginPath();
    canvas.context.arc(x, y, radius, 0, Math.PI * 2);
    canvas.context.fill();
    canvas.context.closePath();
};

canvas.drawLine = function (startX, startY, endX, endY, width, color) {
    canvas.context.strokeStyle = color;
    canvas.context.lineWidth = width;
    canvas.context.beginPath();
    canvas.context.moveTo(startX, startY);
    canvas.context.lineTo(endX, endY);
    canvas.context.stroke();
    canvas.context.closePath();
};

canvas.drawText = function (text, x, y, font, color) {
    canvas.context.font = font;
    canvas.context.fillStyle = color;
    canvas.context.fillText(text, x, y);
};

canvas.drawImage = function (image, x, y) {
    canvas.context.drawImage(image, x, y);
};

canvas.drawObject = function (object, dontBroadcast) {
    if (object.type === 'dot') {
        canvas.drawDot(object.x, object.y, object.radius, object.color);
    } else if (object.type === 'line') {
        canvas.drawLine(object.startX, object.startY, object.endX, object.endY, object.width, object.color);
    } else if (object.type === 'text') {
        canvas.drawText(object.text, object.x, object.y, object.font, object.color);
    } else if (object.type === 'image') {
        canvas.drawImage(object.image, object.x, object.y);
    }
    
    if(collaborate.room !== null && !dontBroadcast){
        collaborate.sendShape(object);
    }
};

canvas.clearStack = function () {
    canvas.stack = [];
};

canvas.addToStack = function (object) {
    canvas.stack.push(object);
};

canvas.drawStack = function () {
    for (var i = 0; i < canvas.stack.length; i += 1) {
        canvas.drawObject(canvas.stack[i], true);
    }
};

canvas.clearCanvas = function() {
    canvas.setSize(window.innerHeight, window.innerWidth);
    canvas.clearStack();
};