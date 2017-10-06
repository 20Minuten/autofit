/********************************************************
* iFrame Autofit receive
* by Tamedia AG | Ben and Juri
*******************************************************/

(function() {
    var autofitIframes,
        autofitIframesLength,
        autofitIsReady = false;

    function setupAutofit() {
        autofitIframes = document.querySelectorAll("iframe.autofit");
        autofitIframesLength = autofitIframes.length;

        for(var i = 0; i < autofitIframesLength; i++) {
            autofitIframes[i].setAttribute("data-id", "autofit-" + i);
            autofitIframes[i].setAttribute("allowfullscreen", "");
            autofitIframes[i].contentWindow.postMessage({"iframeId": "autofit-" + i}, "*");

            if(i === autofitIframesLength - 1) {
                autofitIsReady = true;
            }
        }
    }

    function runAutofit(e) {
        var messageObject = e.data,
            currentIframeId,
            setIframe,
            contentHeight;

        if(messageObject.type === "autofit" && autofitIsReady === true) {
            if(messageObject.iframeId) {
                setIframe = document.querySelector('iframe.autofit[data-id="' + messageObject.iframeId + '"]');
                contentHeight = messageObject.contentHeight;

                if(contentHeight !== parseInt(setIframe.style.height)) {
                    setIframe.style.height = contentHeight + "px";
                }
            } else {
                for(var j = 0; j < autofitIframesLength; j++) {
                    currentIframeId = autofitIframes[j].getAttribute("data-id");
                    autofitIframes[j].contentWindow.postMessage({"iframeId": currentIframeId}, "*");
                }
            }
        }
    }

    document.addEventListener("DOMContentLoaded", setupAutofit);
    window.addEventListener("message", runAutofit);
}());
