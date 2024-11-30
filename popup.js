document.addEventListener('DOMContentLoaded', function() {
    const viewGridButton = document.getElementById('view-grid-button');
    const imageGrid = document.getElementById('image-grid');
  
    viewGridButton.addEventListener('click', function() {
      // Create an invisible file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,.heic';
      fileInput.multiple = true;
  
      // Trigger the file selection dialog
      fileInput.click();
  
      fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        imageGrid.innerHTML = ''; // Clear existing images
  
        Array.from(files).forEach((file) => {
          const fileType = file.type;
          const fileExtension = file.name.split('.').pop().toLowerCase();
  
          if (fileType.startsWith('image/') || fileExtension === 'heic') {
            if (fileType === 'image/heic' || fileExtension === 'heic') {
              // Handle HEIC files using a Web Worker
              const worker = new Worker('worker.js');
              worker.postMessage(file);
              worker.onmessage = function(e) {
                if (e.data.success) {
                  const img = document.createElement('img');
                  img.src = URL.createObjectURL(e.data.blob);
                  imageGrid.appendChild(img);
                } else {
                  console.error('Conversion error:', e.data.error);
                }
              };
            } else {
              // Handle other image files
              const img = document.createElement('img');
              img.src = URL.createObjectURL(file);
              imageGrid.appendChild(img);
            }
          } else {
            console.warn('Unsupported file type:', fileType);
          }
        });
      });
    });
  });
  