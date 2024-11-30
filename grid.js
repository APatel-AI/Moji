chrome.storage.local.get('images', (data) => {
    const imageGrid = document.getElementById('image-grid');
    imageGrid.innerHTML = ''; // Clear any existing content
  
    if (data.images && data.images.length > 0) {
      data.images.forEach((imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Uploaded Image";
        img.style.width = "150px";
        img.style.height = "150px";
        img.style.margin = "10px";
        imageGrid.appendChild(img);
      });
    } else {
      imageGrid.innerHTML = '<p>No images uploaded!</p>';
    }
  });
  