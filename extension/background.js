// start as disabled
chrome.storage.local.set({ status: "disabled" });

chrome.browserAction.onClicked.addListener(function () {
    // change status from action icon
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: "change_status" });
    });
});

chrome.commands.onCommand.addListener(function (command) {
    // change status from command
    if (command === "toggle") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "change_status" });
        });
    }
});

chrome.runtime.onMessage.addListener(function (request) {
    // change action icon and save new status
    chrome.browserAction.setIcon({ path: `img/icon19-${request.cmd}.png` });
    chrome.storage.local.set({ status: `${request.cmd}` });
});
