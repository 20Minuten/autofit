(function() {


    var onIframeContentResize = function (e) {

        var autofitIframes = document.querySelectorAll('iframe.autofit'),
            messageObject = e.data,
            nuHeight;

        if(messageObject.type === 'autofit') {

            for(var i = 0; i < autofitIframes.length; i++) {
                if(autofitIframes[i].src === messageObject.src) {
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


