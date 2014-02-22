var iconImage       = document.getElementById('icon-image');
var canvas          = document.getElementById('canvas');
var canvasContext   = canvas.getContext('2d');
var animationSpeed  = 10;
var animationFrames = 36;
var rotation        = 0;

function ease(x) {
  return (1 - Math.sin(Math.PI / 2 + x * Math.PI)) / 2;
}

function drawIconAtRotation() {
  canvasContext.save();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.translate(
    Math.ceil(canvas.width / 2),
    Math.ceil(canvas.height / 2)
  );
  canvasContext.rotate(2 * Math.PI * ease(rotation));
  canvasContext.drawImage(
    iconImage,
    -Math.ceil(canvas.width / 2),
    -Math.ceil(canvas.height / 2)
  );
  canvasContext.restore();

  chrome.browserAction.setIcon({
    "imageData": canvasContext.getImageData(0, 0, canvas.width, canvas.height)
  });
}

function animateFlip() {
  rotation += 1/animationFrames;
  drawIconAtRotation();

  if (rotation <= 1) {
    setTimeout(animateFlip, animationSpeed);
  } else {
    rotation = 0;
    chrome.browserAction.setIcon({ "path": "icon.png" });
  }
}

chrome.browserAction.onClicked.addListener(animateFlip);
