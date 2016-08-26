/********************************************************
 * iFrame Autofit send
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    "use strict";
    var iframeId;

    function getHeight() {
        var documentHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            ),
            bodyHeight = document.body.offsetHeight,
            heightDiff = documentHeight - bodyHeight;

        if(bodyHeight < documentHeight && heightDiff > 20) {
            return bodyHeight;
        } else {
            return documentHeight;
        }
    }

    function setUpiFrameAutofitter() {
        setInterval(doiFrameAutofitter, 200);
    }

    function doiFrameAutofitter() {
        var dataObject = {
            "type": "autofit",
            "contentHeight": getHeight(),
            "src": document.location.href,
            "iframeId": iframeId
        };
        parent.postMessage(dataObject, "*");
    }

    function receiveParentMessage(e) {
        if(e.data.iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);
    window.addEventListener("message", receiveParentMessage);
})();
