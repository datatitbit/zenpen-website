// Generates favicon, app icons, social share image and logo files from the owner's
// medallion images (assets/zenpen-logo.png = full logo, assets/zenpen-favicon.png =
// simplified mark), which scripts/cut-logo.mjs cuts out of the original renders.
// Run with: npm run brand   (outputs are committed; rerun only if the logo changes)

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const at = (rel) => fileURLToPath(new URL(rel, root));
const INK = "#0c1326";

await mkdir(at("public/brand/"), { recursive: true });
const medallion = await readFile(at("assets/zenpen-logo.png"));
const monogram = await readFile(at("assets/zenpen-favicon.png"));
const png = (img, size) => sharp(img).resize(size, size, { kernel: "lanczos3" }).png().toBuffer();
const onBg = async (svg, size, inner, bg) =>
  sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: await png(svg, inner), gravity: "center" }])
    .png()
    .toBuffer();

// Web logo files used by the header/footer and hero.
await sharp(await png(monogram, 128)).webp({ quality: 92 }).toFile(at("public/brand/zp-mark-v2-128.webp"));
await sharp(await png(medallion, 320)).webp({ quality: 92 }).toFile(at("public/brand/zp-medallion-v2-320.webp"));
await writeFile(at("public/brand/zenpen-logo.png"), medallion);
await writeFile(at("public/brand/zenpen-favicon-mark.png"), monogram);

// Favicon (browser tab): the simplified monogram stays legible at 16 px.
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => png(monogram, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
const dir = Buffer.alloc(16 * pngs.length);
let offset = header.length + dir.length;
pngs.forEach((buf, n) => {
  const o = n * 16;
  dir.writeUInt8(icoSizes[n], o);
  dir.writeUInt8(icoSizes[n], o + 1);
  dir.writeUInt16LE(1, o + 4);
  dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(buf.length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += buf.length;
});
await writeFile(at("app/favicon.ico"), Buffer.concat([header, dir, ...pngs]));

// Home-screen / app icons: monogram on the warm cocoa square so no corners show white.
const COCOA = "#0e3b2c"; // deep green, matching the logo rim
await writeFile(at("app/apple-icon.png"), await onBg(monogram, 180, 164, COCOA));
await writeFile(at("public/brand/icon-192.png"), await onBg(monogram, 192, 176, COCOA));
await writeFile(at("public/brand/icon-512.png"), await onBg(monogram, 512, 470, COCOA));
await writeFile(at("public/brand/icon-maskable-512.png"), await onBg(monogram, 512, 360, COCOA));

// Full lock-ups (medallion + wordmark) for print, social and documents.
const font = "Segoe UI, Arial, Helvetica, sans-serif";
const lockup = (dark) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="480">
  <rect width="1600" height="480" fill="${dark ? INK : "#faf6f0"}"/>
  <text x="520" y="268" font-family="${font}" font-size="210" font-weight="800" fill="${dark ? "#ffffff" : INK}" letter-spacing="-6">Zen<tspan fill="${dark ? "#f2b544" : "#b8652a"}">Pen</tspan></text>
  <text x="528" y="352" font-family="${font}" font-size="44" font-weight="600" fill="${dark ? "#f2b544" : "#8a4519"}" letter-spacing="14">SHOP CALM · LIVE BOLD</text>
</svg>`;
for (const dark of [false, true]) {
  await sharp(Buffer.from(lockup(dark)))
    .composite([{ input: await png(medallion, 380), left: 90, top: 50 }])
    .png()
    .toFile(at(`public/brand/zenpen-logo-${dark ? "dark" : "light"}.png`));
}

// Social share image (1200x630) for WhatsApp, Facebook, X and LinkedIn previews.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="88%" cy="20%" r="60%"><stop offset="0" stop-color="#f2b544" stop-opacity="0.32"/><stop offset="1" stop-color="#f2b544" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0%" cy="100%" r="70%"><stop offset="0" stop-color="#12a27a" stop-opacity="0.4"/><stop offset="1" stop-color="#12a27a" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#ffe6a8"/><stop offset="1" stop-color="#ff7a59"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/><rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
  <text x="80" y="140" font-family="${font}" font-size="26" font-weight="700" letter-spacing="7" fill="#f2b544">ZENPEN · GHANA</text>
  <text x="80" y="250" font-family="${font}" font-size="68" font-weight="800" fill="#ffffff">Gadgets, style</text>
  <text x="80" y="335" font-family="${font}" font-size="68" font-weight="800" fill="#ffffff">&amp; glow —</text>
  <text x="80" y="420" font-family="${font}" font-size="68" font-weight="800" fill="url(#t)">the calm way.</text>
  <text x="80" y="525" font-family="${font}" font-size="27" fill="#c7d0e2">Phones · Fashion · Beauty — launching soon in Ghana</text>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: await png(medallion, 400), left: 740, top: 115 }])
  .png()
  .toFile(at("app/opengraph-image.png"));
await writeFile(at("app/opengraph-image.alt.txt"), "ZenPen — gadgets, style and glow, the calm way. Launching soon in Ghana.");

console.log("ZenPen brand assets written.");
