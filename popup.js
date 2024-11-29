document.getElementById('viewPhotos').addEventListener('click', () => {
    const files = document.getElementById('photoInput').files;
    if (files.length === 0) {
      alert("Please select photos first.");
      return;
    }
  
    const photos = [];
    for (const file of files) {
      photos.push(URL.createObjectURL(file));
    }
  
    // Save photos to storage and open the grid view
    chrome.storage.local.set({ photos }, () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("grid.html") });
    });
  });
  