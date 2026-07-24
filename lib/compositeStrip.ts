// lib/compositeStrip.ts

export const SLOTS = [
  { x: 0.112, y: 0.030, w: 0.776, h: 0.269 },
  { x: 0.112, y: 0.326, w: 0.776, h: 0.269 },
  { x: 0.112, y: 0.623, w: 0.776, h: 0.269 },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function compositeStrip(
  frameSrc: string,
  photos: string[],
  slots: typeof SLOTS = SLOTS,
  outputScale = 3
): Promise<Blob> {
  const frameImg = await loadImage(frameSrc);
  const photoImgs = await Promise.all(photos.map(loadImage));

  const canvas = document.createElement("canvas");
  canvas.width = frameImg.width * outputScale;
  canvas.height = frameImg.height * outputScale;
  const ctx = canvas.getContext("2d")!;

  slots.forEach((slot, i) => {
    const img = photoImgs[i];
    if (!img) return;
    const sx = slot.x * canvas.width;
    const sy = slot.y * canvas.height;
    const sw = slot.w * canvas.width;
    const sh = slot.h * canvas.height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(sx, sy, sw, sh);
    ctx.clip();

    const slotRatio = sw / sh;
    const imgRatio = img.width / img.height;
    if (imgRatio > slotRatio) {
      const scaledW = sh * imgRatio;
      ctx.drawImage(img, sx - (scaledW - sw) / 2, sy, scaledW, sh);
    } else {
      const scaledH = sw / imgRatio;
      ctx.drawImage(img, sx, sy - (scaledH - sh) / 2, sw, scaledH);
    }

    ctx.restore();
  });

  ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}