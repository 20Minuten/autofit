/********************************************************
* iFrame Autofit send
* by Tamedia AG | Ben and Juri
*******************************************************/

(function() {
    var iframeId,
        lastContentHeight,
        currContentHeight,
        currWindowHeight;

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
            currWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if(currContentHeight !== lastContentHeight && currWindowHeight !== screen.height) {
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
        autofitCheck();
        setInterval(autofitCheck, 200);
    }

    function setIframeId(e) {
        if(e.data.iframeId && e.data.iframeId !== iframeId) {
            iframeId = e.data.iframeId;
        }
    }

    document.addEventListener("DOMContentLoaded", setupAutofit);
    window.addEventListener("message", setIframeId);
}());
