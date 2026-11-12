export const MAX_IMAGE_BYTES = 30 * 1024 * 1024;

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export function formatDimensions(image) {
  if (!image) return "—";
  return image.width.toLocaleString() + " × " + image.height.toLocaleString();
}

export function formatRatio(image) {
  if (!image || !image.width || !image.height) return "—";
  let a = image.width;
  let b = image.height;
  while (b) [a, b] = [b, a % b];
  return (image.width / a) + ":" + (image.height / a);
}

export function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("This image could not be decoded by the browser."));
    image.src = source;
    if (image.complete && image.naturalWidth > 0) resolve(image);
  });
}

export async function createImageRecord(file) {
  if (!file || !file.type || !file.type.startsWith("image/")) {
    throw new Error("Choose a valid image file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("This file is larger than 30 MB. Choose a smaller image.");
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await loadImage(url);
    return {
      file, url, name: file.name, size: file.size,
      type: file.type || "image/unknown",
      width: image.naturalWidth, height: image.naturalHeight
    };
  } catch {
    URL.revokeObjectURL(url);
    throw new Error("The image format is not supported by this browser. Try PNG, JPEG or WebP.");
  }
}

export function drawContained(context, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
}

export async function buildDifferenceMap(sourceA, sourceB, threshold = 18) {
  const [imageA, imageB] = await Promise.all([loadImage(sourceA), loadImage(sourceB)]);
  const maxWidth = Math.max(imageA.naturalWidth, imageB.naturalWidth);
  const maxHeight = Math.max(imageA.naturalHeight, imageB.naturalHeight);
  const areaScale = Math.sqrt(1800000 / (maxWidth * maxHeight));
  const scale = Math.min(1, 1600 / Math.max(maxWidth, maxHeight), areaScale);
  const width = Math.max(1, Math.round(maxWidth * scale));
  const height = Math.max(1, Math.round(maxHeight * scale));
  const canvasA = document.createElement("canvas");
  const canvasB = document.createElement("canvas");
  const output = document.createElement("canvas");
  [canvasA, canvasB, output].forEach((canvas) => {
    canvas.width = width;
    canvas.height = height;
  });

  const contextA = canvasA.getContext("2d", { willReadFrequently: true });
  const contextB = canvasB.getContext("2d", { willReadFrequently: true });
  const outputContext = output.getContext("2d", { willReadFrequently: true });
  if (!contextA || !contextB || !outputContext) {
    throw new Error("Canvas is unavailable. Try another browser.");
  }

  [contextA, contextB].forEach((context) => {
    context.fillStyle = "#111722";
    context.fillRect(0, 0, width, height);
  });
  drawContained(contextA, imageA, 0, 0, width, height);
  drawContained(contextB, imageB, 0, 0, width, height);

  const pixelsA = contextA.getImageData(0, 0, width, height).data;
  const pixelsB = contextB.getImageData(0, 0, width, height).data;
  const outputPixels = outputContext.createImageData(width, height);
  const result = outputPixels.data;
  const cutoff = Number(threshold);
  let changedPixels = 0;
  let totalStrength = 0;

  for (let index = 0; index < pixelsA.length; index += 4) {
    const red = Math.abs(pixelsA[index] - pixelsB[index]);
    const green = Math.abs(pixelsA[index + 1] - pixelsB[index + 1]);
    const blue = Math.abs(pixelsA[index + 2] - pixelsB[index + 2]);
    const alpha = Math.abs(pixelsA[index + 3] - pixelsB[index + 3]);
    const strength = Math.max(red, green, blue, alpha);

    if (strength > cutoff) {
      changedPixels += 1;
      totalStrength += strength;
      const heat = Math.min(255, strength * 2.15);
      result[index] = 255;
      result[index + 1] = Math.max(24, 210 - heat);
      result[index + 2] = Math.max(18, 190 - heat * 1.25);
      result[index + 3] = 255;
    } else {
      result[index] = 18;
      result[index + 1] = 25;
      result[index + 2] = 37;
      result[index + 3] = 255;
    }
  }

  outputContext.putImageData(outputPixels, 0, 0);
  const totalPixels = width * height;
  return {
    url: output.toDataURL("image/png"),
    width, height, changedPixels,
    changedPercent: (changedPixels / totalPixels) * 100,
    averageStrength: changedPixels ? totalStrength / changedPixels : 0
  };
}

export async function makeComparisonExport(imageRecordA, imageRecordB, options = {}) {
  const [imageA, imageB] = await Promise.all([
    loadImage(imageRecordA.url), loadImage(imageRecordB.url)
  ]);
  const maxWidth = Math.max(imageA.naturalWidth, imageB.naturalWidth);
  const maxHeight = Math.max(imageA.naturalHeight, imageB.naturalHeight);
  const scale = Math.min(1, 1800 / Math.max(maxWidth, maxHeight));
  const width = Math.max(1, Math.round(maxWidth * scale));
  const height = Math.max(1, Math.round(maxHeight * scale));
  const mode = options.mode || "side-by-side";
  const isPair = mode === "side-by-side";
  const gutter = 28;
  const canvas = document.createElement("canvas");
  canvas.width = isPair ? width * 2 + gutter : width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create an export canvas.");

  context.fillStyle = "#111722";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (isPair) {
    drawContained(context, imageA, 0, 0, width, height);
    drawContained(context, imageB, width + gutter, 0, width, height);
  } else if (mode === "overlay") {
    drawContained(context, imageA, 0, 0, width, height);
    context.globalAlpha = Number(options.opacity ?? 50) / 100;
    drawContained(context, imageB, 0, 0, width, height);
    context.globalAlpha = 1;
  } else if (mode === "wipe") {
    drawContained(context, imageA, 0, 0, width, height);
    context.save();
    context.beginPath();
    context.rect(0, 0, width * (Number(options.wipe ?? 50) / 100), height);
    context.clip();
    drawContained(context, imageB, 0, 0, width, height);
    context.restore();
    context.fillStyle = "#ffffff";
    context.fillRect(width * Number(options.wipe ?? 50) / 100 - 1, 0, 2, height);
  } else {
    drawContained(context, imageA, 0, 0, width, height);
  }
  return canvas.toDataURL("image/png");
}
