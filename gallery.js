chrome.storage.local.get("joyfulImages", ({ joyfulImages }) => {
    const gallery = document.getElementById("gallery");
  
    if (joyfulImages) {
      joyfulImages.forEach((imageUrl) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "gallery-image";
        gallery.appendChild(img);
      });
    } else {
      gallery.innerText = "No images saved yet!";
    }
  });
  