chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'addImages') {
      chrome.storage.local.get(['images'], (result) => {
        const currentImages = result.images || [];
        const updatedImages = currentImages.concat(message.images);
  
        chrome.storage.local.set({ images: updatedImages }, () => {
          sendResponse({ success: true, images: updatedImages });
        });
      });
      return true; // Indicate async response
    }
  });
  