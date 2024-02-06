chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.result) {
        console.log("Received result in content script:", request.result);
        if(request.result=='https://acem.edu.np/'){
        window.location.href = "https://www.example.com";
            }    
        }
});
