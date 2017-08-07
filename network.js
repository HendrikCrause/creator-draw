/* jslint browser:true */
/* global $, global, canvas, saveAs, popup, println */

$('.button.network').click(function () {
    global.hideTabs('network');
    $('.network.tab').toggle(300);
});