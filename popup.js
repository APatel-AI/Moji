const uploadInput = document.getElementById("upload");
const viewGridButton = document.getElementById("viewGrid");

uploadInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  const images = [];

  files.forEach((file) => {
    if (file.type === "image/heic" || file.name.endsWith(".heic")) {
      // Convert HEIC to JPEG
      const reader = new FileReader();
      reader.onload = function (e) {
        heic2any({
          blob: e.target.result,
          toType: "image/jpeg",
          quality: 0.9, 
        })
          .then((convertedBlob) => {
            const convertedReader = new FileReader();
            convertedReader.onload = function (event) {
              images.push(event.target.result);
              chrome.storage.local.set({ images });
            };
            convertedReader.readAsDataURL(convertedBlob);
          })
          .catch((err) => console.error("HEIC conversion error:", err));
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Handle other image formats
      const reader = new FileReader();
      reader.onload = function (e) {
        images.push(e.target.result);
        chrome.storage.local.set({ images });
      };
      reader.readAsDataURL(file);
    }
  });
});

viewGridButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openGridView" });
});
