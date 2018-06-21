/**********************************************************
* iframe autofit send
* by Tamedia AG | Jurica "Juri" Lepur
**********************************************************/

(function() {
    var iframeId,
        lastContentHeight,
        autofitIsReady = false;

    function getHeight() {
        var documentHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            ),
            bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);

        if(bodyHeight < documentHeight) {
            return bodyHeight;
        } else {
            return documentHeight;
        }
    }

    function autofitCheck() {
        var dataObject;
        if(iframeId) {
            var currContentHeight = getHeight();
            if(currContentHeight !== lastContentHeight) {
                dataObject = {
                    type: "autofit",
                    iframeId: iframeId,
                    contentHeight: currContentHeight
                };
                parent.postMessage(dataObject, "*");
                lastContentHeight = currContentHeight;
            }
        } else {
            dataObject = {
                type: "autofit"
            };
            parent.postMessage(dataObject, "*");
        }
    }

    function setupCSS() {
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.height = "auto";
        document.body.style.overflowY = "hidden";
        document.body.style.height = "auto";
    }

    function setupAutofit() {
        setInterval(function runAutofitCheck() {
            if(document.readyState === "interactive" || document.readyState === "complete") {
                if(!autofitIsReady) {
                    autofitIsReady = true;
                    setupCSS();
                }
                autofitCheck();
            }
            return runAutofitCheck;
        }(), 10);
    }

    function setIframeId(e) {
        if(e.data.iframeId && e.data.iframeId !== iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    function shouldRun() {
        return window.self !== window.parent;
    }

    if(shouldRun()) {
        setupAutofit();
        window.addEventListener("message", setIframeId);
    }
}());
