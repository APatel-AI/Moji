const uploadInput = document.getElementById("upload");
const viewGridButton = document.getElementById("viewGrid");

uploadInput.addEventListener("change", (event) => {
  const files = event.target.files;
  const images = [];

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function (e) {
      images.push(e.target.result);
      chrome.storage.local.set({ images });
    };
    reader.readAsDataURL(files[i]);
  }
});

viewGridButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openGridView" });
});
