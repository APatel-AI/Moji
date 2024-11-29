chrome.storage.local.get("images", (data) => {
  const images = data.images || [];
  const gridContainer = document.getElementById("gridContainer");

  if (images.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.style.color = "white";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "20px";
    emptyMessage.textContent = "No images uploaded yet. Please add some from the popup.";
    gridContainer.appendChild(emptyMessage);
    return;
  }

  images.forEach((src, index) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Image ${index + 1}`;

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.textContent = `Image ${index + 1}`;

    gridItem.appendChild(img);
    gridItem.appendChild(overlay);
    gridContainer.appendChild(gridItem);

    // Delay for staggered animation effect
    gridItem.style.animationDelay = `${index * 0.1}s`;
  });
});
