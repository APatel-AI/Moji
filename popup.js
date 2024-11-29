document.getElementById("viewPhotos").addEventListener("click", () => {
    const input = document.getElementById("photoInput");
    const files = input.files;
  
    if (!files || files.length === 0) {
      alert("Please select photos first!");
      return;
    }
  
    // Create an array of object URLs for the selected files
    const photoUrls = [];
    for (const file of files) {
      photoUrls.push(URL.createObjectURL(file));
    }
  
    // Save the photo URLs to Chrome storage
    chrome.storage.local.set({ photos: photoUrls }, () => {
      console.log("Photos saved to storage!");
      // Open the grid view in a new tab
      chrome.runtime.sendMessage({ action: "openGridView" });
    });
  });
  