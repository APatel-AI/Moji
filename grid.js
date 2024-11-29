chrome.storage.local.get("images", (data) => {
  const images = data.images || [];
  const scrollContainer = document.getElementById("scrollContainer");

  if (images.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.style.color = "white";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "20px";
    emptyMessage.textContent = "No images uploaded yet. Please add some from the popup.";
    document.body.appendChild(emptyMessage);
    return;
  }

  // Populate the scroll container with images
  images.forEach((src) => {
    const scrollItem = document.createElement("div");
    scrollItem.className = "scroll-item";

    const img = document.createElement("img");
    img.src = src;
    scrollItem.appendChild(img);
    scrollContainer.appendChild(scrollItem);
  });

  // Infinite horizontal scroll handling
  let scrollLeft = 0;

  window.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent default vertical scroll
    scrollLeft += event.deltaY * 1.5; // Adjust the multiplier for scroll speed
    scrollContainer.scrollLeft = scrollLeft;

    // Infinite effect: Wrap around scrolling
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - window.innerWidth) {
      scrollLeft = 0;
    } else if (scrollContainer.scrollLeft <= 0) {
      scrollLeft = scrollContainer.scrollWidth - window.innerWidth;
    }
  });
});
