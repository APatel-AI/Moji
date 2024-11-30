function handleFileUpload(event) {
    const files = event.target.files;
    const imageUrls = [];
  
    Array.from(files).forEach((file) => {
      if (file.type === 'image/heic') {
        // Convert HEIC to a compatible format using a library like heic2any
        heic2any({ blob: file }).then((converted) => {
          const url = URL.createObjectURL(converted);
          imageUrls.push(url);
          if (imageUrls.length === files.length) {
            sendImagesToBackground(imageUrls);
          }
        });
      } else {
        const url = URL.createObjectURL(file);
        imageUrls.push(url);
        if (imageUrls.length === files.length) {
          sendImagesToBackground(imageUrls);
        }
      }
    });
  
    function sendImagesToBackground(images) {
      chrome.runtime.sendMessage({ type: 'addImages', images }, (response) => {
        if (response.success) {
          console.log('Images stored successfully:', response.images);
          alert('Images uploaded successfully!');
        }
      });
    }
  }
  
  // Add event listeners
  document.getElementById('file-upload').addEventListener('change', handleFileUpload);
  document.getElementById('view-grid').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('grid.html') });
  });
  