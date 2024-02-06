chrome.storage.sync.get(['enabled'], function(result) {
    const isEnabled = result.enabled !== undefined ? result.enabled : true;
    toggleBackgroundScript(isEnabled);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['enabled'], function(result) {
        if (result.enabled !== undefined && result.enabled) {
            if (changeInfo.status === 'complete' && (changeInfo.url || tab.url)) {
                const extractedUrl = changeInfo.url || tab.url;
                extractUrl(extractedUrl);
                sendUrlToServer(extractedUrl);
            }
        }
    });
});

function toggleBackgroundScript(isEnabled) {
    chrome.storage.sync.set({ 'enabled': isEnabled });
    if (isEnabled) {
        // Add any initialization logic if needed
    } else {
        // Add any cleanup logic if needed
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggle) {
        chrome.storage.sync.get(['enabled'], function(result) {
            const isEnabled = result.enabled !== undefined ? !result.enabled : true;
            toggleBackgroundScript(isEnabled);
            sendResponse({ enabled: isEnabled });
        });
    }
    return true;
});

function extractUrl(url) {
    console.log("Extracted URL: " + url);
}

function sendUrlToServer(url) {
    fetch("http://127.0.0.1:5000/?api=" + url)
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { result: data.result });
            });
        });
}