/* jslint browser:true */
/* global $, global */



function penClickCallback() {
    global.hideTabs('pen');
    
    if($(this).hasClass('small')){
        switchPen(1);
    }
    else if($(this).hasClass('medium')){
        switchPen(5);
    }
    else if($(this).hasClass('large')){
        switchPen(10);
    }
    
    $('.pen.tab').toggle(200);
}

function switchPen(radius) {
    global.penSize = radius;
    global.radius = radius;
    global.drawColor = global.currentColor;
}

$('.button.pen').click(penClickCallback);