(function() {
    var autofitIframeCounter = 0,
        autofitIframes = $("iframe.autofit"),
        autofitIframesLength = $("iframe.autofit").length;

    var onIframeContentResize = function (e) {
        var messageObject = e.data,
            currentIframeId,
            nuHeight;

        if(messageObject.type === "autofit") {
            if(autofitIframeCounter < autofitIframesLength) {
                if(messageObject.src && !$('iframe.autofit[src="' + messageObject.src + '"]').attr("data-id")) {
                    $('iframe.autofit[src="' + messageObject.src + '"]').attr("data-id", "autofit-" + autofitIframeCounter);
                    $('iframe.autofit[src="' + messageObject.src + '"]')[0].contentWindow.postMessage({"iframeId": "autofit-" + autofitIframeCounter}, "*");
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

// check if the src of iframe is crossdomain
function domainCheck(iframe) {
    var html = null;
    try {
        var tempdoc = iframe.contentDocument || iframe.contentWindow.document;
        html = tempdoc.body.innerHTML;
    } catch(err) {
        //do nothing on error
    }
    return(html !== null);
}
