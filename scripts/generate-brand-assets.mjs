// Generates favicon, app icons, social share image and logo files from the
// ZenPen mark (assets/zenpen-mark.svg) and the dark app tile (assets/zenpen-tile.svg).
// Run with: npm run brand   (outputs are committed; rerun only if the logo changes)

import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const at = (rel) => fileURLToPath(new URL(rel, root));
const INK = "#0c1326";
const SAND = "#faf6f0";

await mkdir(at("public/brand/"), { recursive: true });
const mark = await readFile(at("assets/zenpen-mark.svg"));
const tile = await readFile(at("assets/zenpen-tile.svg"));
const render = (svg, size) => sharp(svg, { density: 1200 }).resize(size, size).png().toBuffer();

// App icons: dark tile reads well on any home screen.
await writeFile(at("app/apple-icon.png"), await render(tile, 180));
await writeFile(at("public/brand/icon-192.png"), await render(tile, 192));
await writeFile(at("public/brand/icon-512.png"), await render(tile, 512));
await sharp({ create: { width: 512, height: 512, channels: 4, background: INK } })
  .composite([{ input: await render(tile, 360), gravity: "center" }])
  .png()
  .toFile(at("public/brand/icon-maskable-512.png"));

// Favicon (tab icon): the tile stays legible at 16px.
await copyFile(at("assets/zenpen-tile.svg"), at("app/icon.svg"));
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => render(tile, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
const dir = Buffer.alloc(16 * pngs.length);
let offset = header.length + dir.length;
pngs.forEach((png, n) => {
  const o = n * 16;
  dir.writeUInt8(icoSizes[n], o);
  dir.writeUInt8(icoSizes[n], o + 1);
  dir.writeUInt16LE(1, o + 4);
  dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(png.length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += png.length;
});
await writeFile(at("app/favicon.ico"), Buffer.concat([header, dir, ...pngs]));

// Full logo lock-ups (mark + wordmark) for print, social and documents.
const font = "Segoe UI, Arial, Helvetica, sans-serif";
const lockup = (dark) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="480">
  <rect width="1600" height="480" fill="${dark ? INK : SAND}"/>
  <text x="520" y="268" font-family="${font}" font-size="210" font-weight="800" fill="${dark ? "#ffffff" : INK}" letter-spacing="-6">Zen<tspan fill="#12a27a">Pen</tspan></text>
  <text x="528" y="352" font-family="${font}" font-size="44" font-weight="600" fill="${dark ? "#86e6c8" : "#0a6b52"}" letter-spacing="14">SHOP CALM · LIVE BOLD</text>
</svg>`;
for (const dark of [false, true]) {
  const markSvg = dark ? (await readFile(at("assets/zenpen-mark.svg"), "utf8")).replace('stroke="#0c1326"', 'stroke="#ffffff"') : mark;
  await sharp(Buffer.from(lockup(dark)))
    .composite([{ input: await render(Buffer.from(markSvg), 340), left: 120, top: 70 }])
    .png()
    .toFile(at(`public/brand/zenpen-logo-${dark ? "dark" : "light"}.png`));
}
await writeFile(at("public/brand/zenpen-mark-1024.png"), await render(mark, 1024));

// Social share image (1200x630) for WhatsApp, Facebook, X and LinkedIn previews.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="90%" cy="5%" r="65%"><stop offset="0" stop-color="#ff5d3a" stop-opacity="0.35"/><stop offset="1" stop-color="#ff5d3a" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0%" cy="100%" r="70%"><stop offset="0" stop-color="#12a27a" stop-opacity="0.5"/><stop offset="1" stop-color="#12a27a" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#86e6c8"/><stop offset="1" stop-color="#ff7a59"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/><rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
  <text x="80" y="140" font-family="${font}" font-size="26" font-weight="700" letter-spacing="7" fill="#86e6c8">ZENPEN · GHANA</text>
  <text x="80" y="250" font-family="${font}" font-size="70" font-weight="800" fill="#ffffff">Gadgets, style</text>
  <text x="80" y="335" font-family="${font}" font-size="70" font-weight="800" fill="#ffffff">&amp; glow —</text>
  <text x="80" y="420" font-family="${font}" font-size="70" font-weight="800" fill="url(#t)">delivered calm.</text>
  <text x="80" y="525" font-family="${font}" font-size="28" fill="#c7d0e2">Order on WhatsApp · Pay with MoMo · Delivery across Ghana</text>
</svg>`;
const darkMark = Buffer.from((await readFile(at("assets/zenpen-mark.svg"), "utf8")).replace('stroke="#0c1326"', 'stroke="#ffffff"'));
await sharp(Buffer.from(og))
  .composite([{ input: await render(darkMark, 330), left: 810, top: 120 }])
  .png()
  .toFile(at("app/opengraph-image.png"));
await writeFile(at("app/opengraph-image.alt.txt"), "ZenPen — gadgets, style and glow, delivered calm across Ghana.");

console.log("ZenPen brand assets written.");
