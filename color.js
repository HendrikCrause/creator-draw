/* jslint browser:true */
/* global $, global*/

function getColor(element) {
    var i, classList = element.attr('class').split(/\s+/);

    for (i = 0; i < classList.length; i += 1) {
        if (classList[i].indexOf('color') === -1) {
            return classList[i];
        }
    }
}

function colorPickerClickCallback() {
    global.hideTabs('color-picker');
    $('.color-picker.tab').toggle(300);

    var newColor = getColor($(this).find('.color'));

    $('.color-changer').removeClass(global.currentColor);
    $('.color-changer').addClass(newColor);
    global.currentColor = newColor;
    global.drawColor = newColor;
    global.radius = global.penSize;
}

$('.button.color-picker').click(colorPickerClickCallback);