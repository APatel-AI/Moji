chrome.storage.local.get('images', (data) => {
    const imageGrid = document.getElementById('image-grid');
    
    if (data.images && data.images.length > 0) {
      console.log('Loaded images:', data.images); // Debugging log
      data.images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Uploaded Image";
        imageGrid.appendChild(img);
      });
    } else {
      imageGrid.innerHTML = '<p>No images uploaded!</p>';
    }
  });
  