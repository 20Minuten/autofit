/********************************************************
 * iFrame Autofit send
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    var iframeId,
        lastContentHeight,
        currContentHeight;

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
        if(!iframeId) {
            var dataObject = {
                "type": "autofit",
                "src": document.location.href
            };
            parent.postMessage(dataObject, "*");
        } else {
            currContentHeight = getHeight();
            if(currContentHeight !== lastContentHeight) {
                var dataObject = {
                    "type": "autofit",
                    "iframeId": iframeId,
                    "contentHeight": currContentHeight
                };
                parent.postMessage(dataObject, "*");
                lastContentHeight = currContentHeight;
            }
        }
    }

    function receiveParentMessage(e) {
        if(e.data.iframeId && !iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);
    window.addEventListener("message", receiveParentMessage);
})();
