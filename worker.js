// worker.js

self.importScripts(chrome.runtime.getURL('heic2any.min.js'));

self.onmessage = function(event) {
  const file = event.data;
  heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.8
  }).then(function(convertedBlob) {
    self.postMessage({
      success: true,
      blob: convertedBlob
    });
  }).catch(function(error) {
    self.postMessage({
      success: false,
      error: error.message
    });
  });
};
