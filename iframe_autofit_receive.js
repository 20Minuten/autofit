/********************************************************
 * iFrame Autofit receive
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    var autofitIframeCounter = 0,
        autofitIframes = document.querySelectorAll("iframe.autofit"),
        autofitIframesLength = autofitIframes.length;

    var onIframeContentResize = function(e) {
        var messageObject = e.data,
            currentIframeId,
            foundIframe,
            contentHeight;

        if(messageObject.type === "autofit") {
            if(autofitIframeCounter < autofitIframesLength) {
                if(messageObject.src && !document.querySelector('iframe.autofit[src="' + messageObject.src + '"]').getAttribute("data-id")) {
                    foundIframe = document.querySelector('iframe.autofit[src="' + messageObject.src + '"]');
                    foundIframe.setAttribute("data-id", "autofit-" + autofitIframeCounter);
                    foundIframe.contentWindow.postMessage({"iframeId": "autofit-" + autofitIframeCounter}, "*");
                    autofitIframeCounter++;
                }
            } else {
                for(var i = 0; i < autofitIframesLength; i++) {
                    currentIframeId = autofitIframes[i].getAttribute("data-id");
                    if(messageObject.iframeId) {
                        if(currentIframeId === messageObject.iframeId) {
                            contentHeight = messageObject.contentHeight;
                            if(contentHeight !== autofitIframes[i].getAttribute("height")) {
                                autofitIframes[i].setAttribute("height", contentHeight);
                            }
                        }
                    } else {
                        autofitIframes[i].contentWindow.postMessage({"iframeId": currentIframeId}, "*");
                    }
                }
            }
        }
    };

    window.addEventListener("message", onIframeContentResize);
}());
