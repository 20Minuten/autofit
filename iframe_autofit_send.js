/********************************************************
 * iFrame Autofit send
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    "use strict";
    var iframeId;

    function setUpiFrameAutofitter() {
        setInterval(doiFrameAutofitter, 500);
    }

    function doiFrameAutofitter() {
        var contentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        var dataObject = {
            "type": "autofit",
            "contentHeight": contentHeight,
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

    document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);
    window.addEventListener("message", receiveParentMessage);
})();
