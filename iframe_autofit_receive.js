(function() {
    var onIframeContentResize = function (e) {

        var autofitIframes = document.querySelectorAll('iframe.autofit'),
            messageObject = e.data,
            nuHeight,
            iframesrc;

        if(messageObject.type === 'autofit') {
            for(var i = 0; i < autofitIframes.length; i++) {
                if(domainCheck(autofitIframes[i]) === true) {
                    iframesrc = autofitIframes[i].contentWindow.location.href;
                } else {
                    iframesrc = autofitIframes[i].src;
                }
                if(iframesrc === messageObject.src) {
                    nuHeight = messageObject.contentHeight;
                    if(nuHeight !== autofitIframes[i].getAttribute('height')) {
                        autofitIframes[i].setAttribute('height', nuHeight);
                    }
                }
            }
        }
    };
    window.addEventListener('message', onIframeContentResize);
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
