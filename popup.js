function handleFileUpload(event) {
    const files = event.target.files;
    const imageUrls = [];
  
    const processFile = (file) => {
      if (file.type === 'image/heic') {
        heic2any({ blob: file }).then((converted) => {
          const url = URL.createObjectURL(converted);
          imageUrls.push(url);
          checkAndSendImages();
        });
      } else {
        const url = URL.createObjectURL(file);
        imageUrls.push(url);
        checkAndSendImages();
      }
    };
  
    const checkAndSendImages = () => {
      if (imageUrls.length === files.length) {
        sendImagesToBackground(imageUrls);
      }
    };
  
    Array.from(files).forEach(processFile);
  
    function sendImagesToBackground(images) {
      chrome.runtime.sendMessage({ type: 'addImages', images }, (response) => {
        if (response.success) {
          alert('Images uploaded successfully!');
        }
      });
    }
  }
  
  document.getElementById('file-upload').addEventListener('change', handleFileUpload);
  document.getElementById('view-grid').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('grid.html') });
  });
  