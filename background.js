chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openGridView") {
    chrome.tabs.create({ url: chrome.runtime.getURL("grid.html") });
    sendResponse({ status: "success" });
  }
});
