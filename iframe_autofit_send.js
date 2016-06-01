/********************************************************
 * iFrame Autofit
 * by 20 Minuten AG | pascal.zirn@20minuten.ch
 * and ben and juri
 *******************************************************/

var iframeId;

function doiFrameAutofitter() {
    'use strict';
    var script;
    if(!window.jQuery) {
        script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-1.11.2.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        setTimeout(doiFrameAutofitter, 800);
    } else {
        var dataObject = {
            "type": "autofit",
            "contentHeight": $("body").outerHeight(),
            "src": document.location.href,
            "iframeId": iframeId
        };
        parent.postMessage(dataObject, '*');
    }
}
function setUpiFrameAutofitter() {
    setInterval(doiFrameAutofitter, 500);
}
function receiveParentMessage(e) {
    iframeId = e.data.iframeId;
}

document.removeEventListener("DOMContentLoaded", setUpiFrameAutofitter);
document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);

window.removeEventListener("message", receiveParentMessage);
window.addEventListener("message", receiveParentMessage);
