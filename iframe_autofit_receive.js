/**********************************************************
* iframe autofit receive
* by Tamedia AG | Jurica "Juri" Lepur
**********************************************************/

(function() {
    var autofitIframes,
        autofitIsReady = false,
        iframeIdList = [];

    function setIframeId() {
        var id = "autofit_" + Math.random().toString(36).substr(2, 8);

        if(iframeIdList.indexOf(id) === -1) {
            iframeIdList.push(id);
        } else {
            setIframeId();
        }
        return id;
    }

    function runAutofit(e) {
        var messageObject = e.data;

        if(autofitIsReady && messageObject.type === "autofit") {
            if(messageObject.iframeId) {
                var setIframe = document.querySelector('iframe.autofit[data-id="' + messageObject.iframeId + '"]'),
                    contentHeight = messageObject.contentHeight;

                if(setIframe && contentHeight !== parseInt(setIframe.style.height)) {
                    setIframe.style.height = contentHeight + "px";
                }
            } else {
                for(var i = 0; i < autofitIframes.length; i++) {
                    var currentIframeId = autofitIframes[i].getAttribute("data-id");
                    autofitIframes[i].contentWindow.postMessage({type: "setAutofit", iframeId: currentIframeId}, "*");
                }
            }
        }
    }

    function destroyAutofit() {
        if(autofitIframes && autofitIframes.length) {
            for(var j = 0; j < autofitIframes.length; j++) {
                autofitIframes[j].removeAttribute("data-id");
            }
            autofitIframes = null;
        }
        autofitIsReady = false;
        window.removeEventListener("message", runAutofit);
    }

    function setupAutofit() {
        if(document.querySelectorAll("iframe.autofit").length) {
            var currentIframes = document.querySelectorAll("iframe.autofit"),
                shouldUpdate = false;

            if(autofitIframes) {
                if(currentIframes.length === autofitIframes.length) {
                    for(var k = 0; k < currentIframes.length; k++) {
                        if(!currentIframes[k].getAttribute("data-id")) {
                            shouldUpdate = true;
                            break;
                        }
                    }
                } else {
                    shouldUpdate = true;
                }
            } else {
                shouldUpdate = true;
            }
            if(shouldUpdate) {
                autofitIsReady = false;
                autofitIframes = currentIframes;

                for(var l = 0; l < autofitIframes.length; l++) {
                    if(!autofitIframes[l].getAttribute("data-id")) {
                        var autofitId = setIframeId();
                        autofitIframes[l].setAttribute("data-id", autofitId);
                        autofitIframes[l].setAttribute("allowfullscreen", "");
                        autofitIframes[l].contentWindow.postMessage({type: "setAutofit", iframeId: autofitId}, "*");
                    }
                    if(l === autofitIframes.length - 1) {
                        autofitIsReady = true;
                        window.addEventListener("message", runAutofit);
                    }
                }
            }
        } else {
            destroyAutofit();
        }
    }

    setInterval(function initAutofit() {
        setupAutofit();
        return initAutofit;
    }(), 10);
}());
