function handleFileUpload(event) {
    const files = event.target.files;
    const heic2any = window.heic2any; // Ensure this library is included
    const imageUrls = [];
  
    // Process files
    Array.from(files).forEach(file => {
      if (file.type === 'image/heic') {
        heic2any({ blob: file }).then(converted => {
          imageUrls.push(URL.createObjectURL(converted));
          sendImagesToBackground(imageUrls);
        });
      } else {
        imageUrls.push(URL.createObjectURL(file));
      }
    });
  
    // Send images to background storage
    function sendImagesToBackground(images) {
      chrome.runtime.sendMessage({ type: 'addImages', images }, (response) => {
        if (response.success) {
          console.log('Images stored successfully:', response.images);
          alert('Images uploaded successfully!'); // Temporary feedback for users
        }
      });
    }
  }
  
  // Add event listeners
  document.getElementById('file-upload').addEventListener('change', handleFileUpload);
  document.getElementById('view-grid').addEventListener('click', () => {
    // Open a persistent page for viewing the grid
    chrome.tabs.create({ url: chrome.runtime.getURL('grid.html') });
  });
  