// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Set the initial state of the button based on storage
    chrome.storage.sync.get(['enabled'], function(result) {
        const isEnabled = result.enabled !== undefined ? result.enabled : true;
        document.getElementById('toggleButton').innerText = isEnabled ? 'On' : 'Off';
    });

    // Toggle button click handler
    document.getElementById('toggleButton').addEventListener('click', function() {
        chrome.runtime.sendMessage({ toggle: true }, function(response) {
            document.getElementById('toggleButton').innerText = response.enabled ? 'On' : 'Off';
        });
    });
});
