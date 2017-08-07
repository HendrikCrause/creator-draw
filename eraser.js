/* jslint browser:true */
/* global $, global, canvas */

function switchEraser(radius) {
    global.radius = radius;
    global.drawColor = canvas.backgroundColor;
}

function eraserClickCallback() {
    global.hideTabs('eraser');
    
    if($(this).hasClass('small')) {
        switchEraser(5);
    }
    else if($(this).hasClass('large')) {
        switchEraser(15);
    }
    else if($(this).hasClass('clear')) {
        popup.show('clear'); 
    }
    
    $('.eraser.tab').toggle(300);
}

$('.button.eraser').click(eraserClickCallback);

$('.action.clear').click(function(){
    canvas.clearCanvas();
    global.radius = global.penSize;
    global.drawColor = global.currentColor;
    popup.cancel();
    
    if(collaborate.room){
        collaborate.clearCanvas();
    }
});