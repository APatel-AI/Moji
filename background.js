chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['images'], (result) => {
      if (!result.images) {
        chrome.storage.local.set({ images: [] });
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'addImages') {
      addImagesToStorage(message.images, sendResponse);
    } else if (message.type === 'clearImages') {
      clearImagesFromStorage(sendResponse);
    }
    return true;
  });
  
  function addImagesToStorage(newImages, callback) {
    chrome.storage.local.get(['images'], (result) => {
      const currentImages = result.images || [];
      const updatedImages = currentImages.concat(newImages);
  
      chrome.storage.local.set({ images: updatedImages }, () => {
        if (callback) callback({ success: true, images: updatedImages });
      });
    });
  }
  
  function clearImagesFromStorage(callback) {
    chrome.storage.local.set({ images: [] }, () => {
      if (callback) callback({ success: true });
    });
  }
  