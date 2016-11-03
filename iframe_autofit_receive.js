/********************************************************
 * iFrame Autofit receive
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    var autofitIframeCounter,
        autofitIframes,
        autofitIframesLength;

    var getAutofitIframes = function() {
        autofitIframeCounter = 0;
        autofitIframes = document.querySelectorAll("iframe.autofit");
        autofitIframesLength = autofitIframes.length;
    };

    var onIframeContentResize = function(e) {
        var messageObject = e.data,
            currentIframeId,
            setIframe,
            contentHeight;

        if(messageObject.type === "autofit") {
            if(autofitIframeCounter < autofitIframesLength) {
                for(var i = 0; i < autofitIframesLength; i++) {
                    if(autofitIframes[i].src === messageObject.src && !autofitIframes[i].getAttribute("data-id")) {
                        autofitIframes[i].setAttribute("data-id", "autofit-" + autofitIframeCounter);
                        autofitIframes[i].contentWindow.postMessage({"iframeId": "autofit-" + autofitIframeCounter}, "*");
                        autofitIframeCounter++;
                        return;
                    }
                }
            } else {
                if(messageObject.iframeId) {
                    setIframe = document.querySelector('iframe.autofit[data-id="' + messageObject.iframeId + '"]');
                    contentHeight = messageObject.contentHeight;
                    if(contentHeight !== setIframe.getAttribute("height")) {
                        setIframe.setAttribute("height", contentHeight);
                    }
                } else {
                    for(var j = 0; j < autofitIframesLength; j++) {
                        currentIframeId = autofitIframes[j].getAttribute("data-id");
                        autofitIframes[j].contentWindow.postMessage({"iframeId": currentIframeId}, "*");
                    }
                }
            }
        }
    };

    document.addEventListener("DOMContentLoaded", getAutofitIframes);
    window.addEventListener("message", onIframeContentResize);
}());
