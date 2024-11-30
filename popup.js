// Handle file upload
function handleFileUpload(event) {
    const files = event.target.files;
    const heic2any = window.heic2any; // Ensure this library is included in your project
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
  
  // Add event listener for file upload
  document.getElementById('file-upload').addEventListener('change', handleFileUpload);
  
  // Handle "View Grid" button click
  document.getElementById('view-grid').addEventListener('click', viewGrid);
  
  function viewGrid() {
    // Open a new tab to display the image grid
    chrome.tabs.create({ url: chrome.runtime.getURL('grid.html') }, (tab) => {
      console.log('Grid view opened:', tab);
    });
  }
  