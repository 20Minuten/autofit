/********************************************************
* iFrame Autofit send
* by Tamedia AG | Ben and Juri
*******************************************************/

(function() {
    var iframeId,
        lastContentHeight,
        currContentHeight;

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
            currContentHeight = getHeight();
            if(currContentHeight !== lastContentHeight) {
                dataObject = {
                    "type": "autofit",
                    "iframeId": iframeId,
                    "contentHeight": currContentHeight
                };
                parent.postMessage(dataObject, "*");
                lastContentHeight = currContentHeight;
            }
        } else {
            dataObject = {
                "type": "autofit"
            };
            parent.postMessage(dataObject, "*");
        }
    }

    function setupCSS() {
        document.documentElement.style.overflowY = "hidden";
        document.body.style.overflowY = "hidden";
    }

    function setupAutofit() {
        setupCSS();
        setInterval(function runAutofitCheck() {
            autofitCheck();
            return runAutofitCheck;
        }(), 200);
    }

    function setIframeId(e) {
        if(e.data.iframeId && e.data.iframeId !== iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.addEventListener("DOMContentLoaded", setupAutofit);
    window.addEventListener("message", setIframeId);
}());
