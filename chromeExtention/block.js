chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.url.startsWith("https://acem.edu.np")){
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.removeListener();