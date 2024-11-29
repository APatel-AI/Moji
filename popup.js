const uploadInput = document.getElementById("upload");
const viewGridButton = document.getElementById("viewGrid");

uploadInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  const images = [];

  files.forEach((file) => {
    if (file.type === "image/heic" || file.name.endsWith(".heic")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log("HEIC file loaded into ArrayBuffer:", e.target.result); // Debugging output
        heic2any({
          blob: e.target.result,
          toType: "image/jpeg",
          quality: 0.9,
        })
          .then((convertedBlob) => {
            console.log("HEIC converted to JPEG successfully");
            const convertedReader = new FileReader();
            convertedReader.onload = function (event) {
              console.log("Converted JPEG data URL:", event.target.result); // Debugging output
              images.push(event.target.result);
              chrome.storage.local.set({ images }, () =>
                console.log("Images saved successfully")
              );
            };
            convertedReader.readAsDataURL(convertedBlob);
          })
          .catch((err) => {
            console.error("HEIC conversion error:", err); // Log errors
          });
      };
      reader.readAsArrayBuffer(file); // Ensure the HEIC file is read as an ArrayBuffer
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
