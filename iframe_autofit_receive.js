/********************************************************
 * iFrame Autofit receive
 * by 20 Minuten AG | Mason, Ben and Juri
 *******************************************************/

(function() {
    var autofitIframeCounter = 0,
        autofitIframes = document.querySelectorAll("iframe.autofit"),
        autofitIframesLength = autofitIframes.length;

    var onIframeContentResize = function (e) {
        var messageObject = e.data,
            currentIframeId,
            nuHeight;

        if(messageObject.type === "autofit") {
            if(autofitIframeCounter < autofitIframesLength) {
                if(messageObject.src && !document.querySelector('iframe.autofit[src="' + messageObject.src + '"]').getAttribute("data-id")) {
                    document.querySelector('iframe.autofit[src="' + messageObject.src + '"]').removeAttribute("height");
                    document.querySelector('iframe.autofit[src="' + messageObject.src + '"]').setAttribute("data-id", "autofit-" + autofitIframeCounter);
                    document.querySelector('iframe.autofit[src="' + messageObject.src + '"]').contentWindow.postMessage({"iframeId": "autofit-" + autofitIframeCounter}, "*");
                    autofitIframeCounter++;
                }
            } else {
                for(var i = 0; i < autofitIframesLength; i++) {
                    currentIframeId = autofitIframes[i].getAttribute("data-id");
                    if(messageObject.iframeId) {
                        if(currentIframeId === messageObject.iframeId) {
                            nuHeight = messageObject.contentHeight;
                            if(nuHeight !== autofitIframes[i].getAttribute("height")) {
                                autofitIframes[i].setAttribute("height", nuHeight);
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
