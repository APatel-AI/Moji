document.getElementById("saveImages").addEventListener("click", async () => {
    const files = document.getElementById("imageInput").files;
    const images = [];
  
    for (const file of files) {
      if (file.type === "image/heic") {
        const jpegImage = await convertHEICtoJPEG(file); // Use HEIC to JPEG conversion
        images.push(jpegImage);
      } else {
        images.push(URL.createObjectURL(file));
      }
    }
  
    // Save the image URLs to Chrome storage
    chrome.storage.local.set({ joyfulImages: images }, () => {
      document.getElementById("message").innerText = "Images saved!";
    });
  });
  
  async function convertHEICtoJPEG(file) {
    const heic2any = await import('./lib/heic-to-jpeg.js');
    const blob = await heic2any.convert({ blob: file });
    return URL.createObjectURL(blob);
  }
  