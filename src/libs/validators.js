export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function isValid(item) {
  if (item === null || item === undefined || item === "") return false;
  else return true;
}

export function checkIfNumber(num) {
  const re = /^[0-9\b]+$/;

  if (num === "" || re.test(num)) {
    return true;
  } else {
    return false;
  }
}

export function checkIfDecimal(num) {
  const decimal = /^-?\d+\.?\d{0,2}$/;

  if (num === "" || decimal.test(num)) {
    return true;
  } else {
    return false;
  }
}

export function numbersAndLetters(string) {
  if (/^[A-Za-z0-9]+$/.test(string)) {
    return true;
  } else {
    return false;
  }
}

export function validURL(str) {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function validateEmail(email) {
  let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
}

export function checkIfBusinessEmail(email) {
  if (email !== undefined && email !== null && email !== "") {
    let domain = email
      .split("@")[1]
      .split(".")[0]
      .toLowerCase();
    //console.log("domain", domain);
    let disallowedDomains = [
      "gmail",
      "yahoo",
      "aol",
      "icloud",
      "rediff",
      "outlook",
      "hotmail"
    ];

    if (disallowedDomains.find(d => d.includes(domain))) {
      return true;
    }
  }
  return false;
}

// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object
export function base64StringtoFile(base64String, filename) {
  let arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Download a Base64-encoded file

export function downloadBase64File(base64Data, filename) {
  let element = document.createElement("a");
  element.setAttribute("href", base64Data);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
  );
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  const canvas = canvasRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = image64;
  image.onload = function() {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
}
