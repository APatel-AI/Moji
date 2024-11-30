// Initialize storage for images if not already set
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['images'], (result) => {
      if (!result.images) {
        chrome.storage.local.set({ images: [] });
      }
    });
  });
  
  // Listen for messages from popup or other scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'addImages') {
      addImagesToStorage(message.images, sendResponse);
    } else if (message.type === 'clearImages') {
      clearImagesFromStorage(sendResponse);
    }
    // Return true to indicate that a response will be sent asynchronously
    return true;
  });
  
  // Add images to Chrome's local storage
  function addImagesToStorage(newImages, callback) {
    chrome.storage.local.get(['images'], (result) => {
      const currentImages = result.images || [];
      const updatedImages = currentImages.concat(newImages);
  
      chrome.storage.local.set({ images: updatedImages }, () => {
        if (callback) callback({ success: true, images: updatedImages });
      });
    });
  }
  
  // Clear all images from storage
  function clearImagesFromStorage(callback) {
    chrome.storage.local.set({ images: [] }, () => {
      if (callback) callback({ success: true });
    });
  }
  