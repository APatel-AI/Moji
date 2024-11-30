document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-input').addEventListener('change', function(event) {
      const files = event.target.files;
      const imageGrid = document.getElementById('image-grid');
      imageGrid.innerHTML = ''; // Clear existing images
  
      Array.from(files).forEach((file) => {
        const fileType = file.type;
        const fileExtension = file.name.split('.').pop().toLowerCase();
  
        if (fileType.startsWith('image/') || fileExtension === 'heic') {
          if (fileType === 'image/heic' || fileExtension === 'heic') {
            // Handle HEIC files
            heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.8
            }).then(function(convertedBlob) {
              const img = document.createElement('img');
              img.src = URL.createObjectURL(convertedBlob);
              imageGrid.appendChild(img);
            }).catch(function(error) {
              console.error(error);
            });
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
  