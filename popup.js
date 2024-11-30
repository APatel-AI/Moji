function handleFileUpload(event) {
    const files = event.target.files;
    const heic2any = window.heic2any;
    const imageUrls = [];
  
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
        }
      });
    }
  }
  