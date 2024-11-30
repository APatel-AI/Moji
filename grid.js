chrome.storage.local.get('images', data => {
    const imageGrid = document.getElementById('image-grid');
    if (data.images && data.images.length > 0) {
      data.images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageGrid.appendChild(img);
      });
    } else {
      imageGrid.innerHTML = '<p>No images uploaded!</p>';
    }
  });
  