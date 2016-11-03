/********************************************************
 * iFrame Autofit send
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    var iframeId,
        lastContentHeight,
        currContentHeight,
        currWindowHeight;

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
        var dataObject = {};
        if(!iframeId) {
            dataObject = {
                "type": "autofit",
                "src": document.location.href
            };
            parent.postMessage(dataObject, "*");
        } else {
            currContentHeight = getHeight();
            currWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if(currContentHeight !== lastContentHeight && currWindowHeight !== screen.height) {
                dataObject = {
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
        if(e.data.iframeId && e.data.iframeId !== iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.addEventListener("DOMContentLoaded", setUpiFrameAutofitter);
    window.addEventListener("message", receiveParentMessage);
})();
