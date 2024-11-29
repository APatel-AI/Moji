// Load photos from storage
chrome.storage.local.get('photos', ({ photos }) => {
    if (!photos || photos.length === 0) return;
  
    const container = document.querySelector('.grid-container');
    photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo;
      container.appendChild(img);
    });
  });
  