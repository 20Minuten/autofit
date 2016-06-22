/********************************************************
 * iFrame Autofit
 * by 20 Minuten AG | pascal.zirn@20minuten.ch
 * and ben and juri
 *******************************************************/

(function() {
    'use strict';

    var iframeId;

    // Analogue to jQueries height() function
    function getContentHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    function doiFrameAutofitter() {
        var dataObject = {
            'type': 'autofit',
            'contentHeight': getContentHeight(),
            'src': document.location.href,
            'iframeId': iframeId
        };

        parent.postMessage(dataObject, '*');

    }

    function setUpiFrameAutofitter() {
        setInterval(doiFrameAutofitter, 500);
    }

    function receiveParentMessage(e) {
        if (e.data.iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.removeEventListener('DOMContentLoaded', setUpiFrameAutofitter);
    document.addEventListener('DOMContentLoaded', setUpiFrameAutofitter);

    window.removeEventListener('message', receiveParentMessage);
    window.addEventListener('message', receiveParentMessage);
})();
