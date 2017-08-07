/* jslint browser:true */
/* global $, global, canvas, popup, keyboard, println */

function init() {
    
    global.currentColor = 'black';
    global.drawColor = global.currentColor;
    $('.color-changer').addClass(global.currentColor);
    
    global.radius = 1;
    global.penSize = 1;
    
    keyboard.textSize = 16;
    keyboard.textMode = false;
    keyboard.updateSize();
    
    popup.visible = false;
    
    canvas.setSize(window.innerHeight, window.innerWidth);
    
    var roomname = getQueryVariable('live');
    if(roomname){
        collaborate.join(roomname);
    }
}

global.hideTabs = function(selected) {
    $('.tab').not('.' + selected).hide(200);
};

global.anyOpenTabs = function(){
    return $('.tab').is(':visible');
};

function helpClickCallback() {
    global.hideTabs('help');
    $('#greyout').fadeIn(500);
}

$('.button.help').click(helpClickCallback);

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

init();