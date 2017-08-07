/* jslint browser:true */
/* global $, canvas, global, popup, println */

var keyboard = keyboard || {};

keyboard.updateSize = function () {
    $('.text.fontsize').val(keyboard.textSize.toString() + 'pt');
};

var keyboardClickCallback = function () {
    global.hideTabs('keyboard');
    $('.keyboard.tab').toggle(300);
    $('.text.input').val('');
    $('.text.input').focus();
    keyboard.textMode = true;
};

var incTextSize = function () {
    if (keyboard.textSize < 50) {
        keyboard.textSize += 2;
        keyboard.updateSize();
    }
};

var decTextSize = function () {
    if (keyboard.textSize > 6) {
        keyboard.textSize -= 2;
        keyboard.updateSize();
    }
};

var keyPressCallback = function (event) {
    if ($('.text.fontsize').is(':focus')) {
        if (isNumber(event.which)) {
            return true;
        } else {
            return false;
        }
    } else if (isText(event.which) && !keyboard.textMode && !popup.visible) {
        keyboardClickCallback();
    }
};

var isText = function (char) {
    return (char >= 33 && // !
        char <= 126); // ~
};

var isNumber = function (char) {
    return (char >= 48 && // 0
        char <= 57); // 9
};

var keyDownCallback = function (event) {
    if ($('.text.fontsize').is(':focus') &&
        (event.which === 27)) {
        keyboard.updateSize();
        $('.text.input').focus();

    } else if ($('.text.fontsize').is(':focus') &&
        (event.which === 13)) {
        fontSizeFocusOut();
        $('.text.input').focus();

    } else if (event.which === 27) { // Escape
        global.hideTabs('all');
        keyboard.textMode = false;
        popup.cancel();
    } else if (event.which === 13 && // Enter
        keyboard.textMode) {
        global.hideTabs('all'); // Keep textMode
        if($('.text.input').val() === ''){
            keyboard.textMode = false;
        }
    }
};

var fontSizeFocusIn = function () {
    $('.text.fontsize').val('');
};

var fontSizeFocusOut = function () {
    var val = $('.text.fontsize').val();

    if (val === '') {
        global.updateSize();
    } else {
        global.textSize = parseInt(val, 10);
        if (global.textSize > 50) {
            global.textSize = 50;
        } else if (global.textSize < 6) {
            global.textSize = 6;
        }
        global.updateSize();
    }
};

$('.button.keyboard').click(keyboardClickCallback);
$('.inc').click(incTextSize);
$('.dec').click(decTextSize);
$('.text.fontsize').focusin(fontSizeFocusIn);
$('.text.fontsize').focusout(fontSizeFocusOut);
$('body').keypress(keyPressCallback);
$('body').keydown(keyDownCallback);