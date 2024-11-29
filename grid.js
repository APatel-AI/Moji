chrome.storage.local.get("photos", ({ photos }) => {
    if (!photos || photos.length === 0) {
      console.log("No photos found in storage!");
      return;
    }
  
    const container = document.querySelector(".grid-container");
    photos.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      container.appendChild(img);
    });
  });
  