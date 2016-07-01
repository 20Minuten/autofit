/********************************************************
 * iFrame Autofit send
 * by 20 Minuten AG | Pascal, Ben and Juri
 *******************************************************/

(function() {
    "use strict";
    var iframeId;

    function setUpiFrameAutofitter() {
        setInterval(doiFrameAutofitter, 500);
    }

    function doiFrameAutofitter() {
        var dataObject = {
            "type": "autofit",
            "contentHeight": document.body.offsetHeight,
            "src": document.location.href,
            "iframeId": iframeId
        };
        parent.postMessage(dataObject, "*");
    }

    function receiveParentMessage(e) {
        if (e.data.iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.removeEventListener("DOMContentLoaded", setUpiFrameAutofitter);
    document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);

    window.removeEventListener("message", receiveParentMessage);
    window.addEventListener("message", receiveParentMessage);
})();
