// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openGridView") {
      // Open the grid view in a new tab
      chrome.tabs.create({ url: chrome.runtime.getURL("grid.html") });
      sendResponse({ status: "success", message: "Grid view opened!" });
    }
  });
  
  // Debugging: Log when the background script starts
  console.log("Background script running...");
  