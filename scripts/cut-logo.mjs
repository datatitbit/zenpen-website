// Cuts the owner's rendered medallion logos out of their photo backgrounds
// (assets/source/*.jpg -> assets/zenpen-logo.png, assets/zenpen-favicon.png):
// finds the coloured medallion (the wall and shadow are low-saturation), fits a
// circle to it, and keeps only that circle on transparency.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
const at = (rel) => fileURLToPath(new URL(`../${rel}`, import.meta.url));

async function cut(name, captionTop) {
  const { data, info } = await sharp(at(`assets/source/${name}.jpg`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < captionTop; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      if (sat > 0.28 && max > 40) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const r = Math.min(maxX - minX, maxY - minY) / 2 - 1;
  const side = Math.ceil(r * 2);
  const left = Math.round(cx - r), top = Math.round(cy - r);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}"><circle cx="${side / 2}" cy="${side / 2}" r="${side / 2 - 0.5}" fill="#fff"/></svg>`);
  await sharp(at(`assets/source/${name}.jpg`))
    .extract({ left, top, width: side, height: side })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(at(`assets/${name}.png`));
  console.log(name, { left, top, side, bbox: [minX, minY, maxX, maxY] });
}

await cut("zenpen-logo", 590);
await cut("zenpen-favicon", 590);
