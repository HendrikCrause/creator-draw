/* jslint browser:true */
/* global $, global, canvas, popup */

function resize() {
    canvas.setSize(window.innerHeight, window.innerWidth);
    canvas.drawStack();
    popup.position(popup.current);
}

window.addEventListener('resize', resize);
