chrome.storage.local.get("images", (data) => {
  const images = data.images || [];
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    document.body.appendChild(img);
  });
});
