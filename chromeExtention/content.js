chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.result) {
        if (request.result == 1) {
            blockUrl();
            return true; 
        }    
    }
});

function blockUrl() {
    window.location.href = "about:blank"; 
}
