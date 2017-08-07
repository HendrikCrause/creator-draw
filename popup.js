/* jslint browser:true */
/* global $, global, canvas, saveAs, println */

var popup = popup || {};

popup.show = function (popupName) {
    popup.visible = true;
    popup.current = popupName;
    $('#greyout').fadeIn(500);
    $('.popup').css('z-index', '1');
    $('.popup.' + popupName).css('z-index', '10');
    popup.position(popupName);
};

popup.position = function(popupName){
    var top = Math.floor(($(window).height() / 2) - ($('.popup.' + popupName).outerHeight() / 2));
    var left = Math.floor(($(window).width() / 2) - ($('.popup.' + popupName).outerWidth() / 2));
    $('.popup.' + popupName).css('top', top.toString() + 'px');
    $('.popup.' + popupName).css('left', left.toString() + 'px');
};

popup.cancel = function () {
    popup.visible = false;
    $('#greyout').fadeOut(500);
    $('.popup').css('z-index', '1');
};

popup.alert = function(message){
    $('#message').html(message);
    popup.show('message');
};

$('.cancel').click(popup.cancel);
$('.cancel-inline').click(popup.cancel);