// Builds the ZenPen medallion logo as clean vector SVGs, redrawn from the owner's
// chosen concept (copper medallion · ZP monogram with a pen-nib stem · wreath of
// pens · "ZEN PEN ENTERPRISE" around the rim), recoloured warm amber-gold + cocoa.
//
// Outputs: assets/zenpen-medallion.svg (full logo) and assets/zenpen-monogram.svg
// (simplified, for favicons and tiny sizes). Run: node scripts/build-logo.mjs

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const at = (rel) => fileURLToPath(new URL(`../${rel}`, import.meta.url));
const C = 256; // centre of the 512 x 512 canvas
const pt = (r, deg) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)];
const f = (n) => n.toFixed(1);

// Palette: gold = value, amber/copper = warmth, cocoa = contrast,
// green = growth & calm (laurel, matches the site's jade), cream = softness/welcome.
const COLORS = {
  goldHi: "#FFE6A8",
  gold: "#F2B544",
  amber: "#DE8F35",
  copper: "#B8652A",
  copperDeep: "#8A4519",
  cocoa: "#3E1F10",
  cocoaMid: "#5A2E17",
  cream: "#FFF4DC",
  green: "#0E5A43",
  greenDeep: "#083A2B",
  leaf: "#5FCF9F",
  leafDeep: "#2E9C72",
};

const defs = `
  <defs>
    <linearGradient id="zp-metal" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="${COLORS.goldHi}"/>
      <stop offset="0.35" stop-color="${COLORS.gold}"/>
      <stop offset="0.7" stop-color="${COLORS.amber}"/>
      <stop offset="1" stop-color="${COLORS.copper}"/>
    </linearGradient>
    <linearGradient id="zp-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${COLORS.gold}"/>
      <stop offset="1" stop-color="${COLORS.copperDeep}"/>
    </linearGradient>
    <radialGradient id="zp-face" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0" stop-color="${COLORS.cream}"/>
      <stop offset="0.7" stop-color="#FCEBC4"/>
      <stop offset="1" stop-color="#F6D898"/>
    </radialGradient>
    <radialGradient id="zp-band" cx="0.4" cy="0.3" r="0.85">
      <stop offset="0" stop-color="${COLORS.green}"/>
      <stop offset="1" stop-color="${COLORS.greenDeep}"/>
    </radialGradient>
  </defs>`;

// ZP monogram: serif Z with a thick diagonal; the P's stem is a pencil — metal band,
// sharpened wood cone and graphite tip — so the mark reads as "writing" at a glance.
function monogram(fill, band, wood, outline, graphite) {
  const z = `<path fill="${fill}" d="M146 182 H266 L268 195 L184 318 H252 L262 296 H272 L266 338 H140 L139 326 L222 203 H164 L156 222 H146 Z"/>`;
  const p = `<path fill="${fill}" fill-rule="evenodd" d="M238 182 H302 C344 182 368 204 368 238 C368 272 344 294 302 294 H270 V300 H238 Z M270 202 V274 H298 C324 274 338 260 338 238 C338 216 324 202 298 202 Z"/>`;
  const pencil = `
    <rect x="236" y="298" width="36" height="17" rx="2" fill="${band}" stroke="${outline}" stroke-width="2"/>
    <path d="M237 304.5 H271 M237 309 H271" stroke="${outline}" stroke-width="1.6" opacity="0.7"/>
    <path d="M237 315 H271 L254 384 Z" fill="${wood}" stroke="${outline}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M237 315 Q242.7 322 248.3 315 Q254 322 259.7 315 Q265.3 322 271 315" fill="none" stroke="${outline}" stroke-width="2"/>
    <path d="M247.3 357 H260.7 L254 384 Z" fill="${graphite}"/>`;
  return z + p + pencil;
}

// Wreath: two pens curving round the centre, nibs meeting at the top, leaves along each.
function wreath(color, leafColor) {
  const R = 158;
  let out = "";
  for (const side of [-1, 1]) {
    const startDeg = side < 0 ? 104 : 76;
    const endDeg = side < 0 ? 258 : 282;
    const [x1, y1] = pt(R, startDeg);
    const [x2, y2] = pt(R, endDeg);
    out += `<path d="M${f(x1)} ${f(y1)} A${R} ${R} 0 0 ${side < 0 ? 1 : 0} ${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"/>`;
    // Pen cap band near the bottom end.
    const [bx, by] = pt(R, side < 0 ? 112 : 68);
    out += `<circle cx="${f(bx)}" cy="${f(by)}" r="8" fill="${color}"/>`;
    // Nib at the top end, pointing toward the other pen.
    const [nx, ny] = pt(R, side < 0 ? 262 : 278);
    const dir = side < 0 ? 1 : -1;
    out += `<path fill="${color}" d="M${f(nx - dir * 4)} ${f(ny - 8)} L${f(nx + dir * 16)} ${f(ny + 1)} L${f(nx - dir * 4)} ${f(ny + 9)} Z"/>`;
    // Leaves, alternating outside / inside the pen body.
    for (let i = 0; i < 10; i++) {
      const deg = side < 0 ? 120 + i * 14 : 60 - i * 14;
      for (const off of [-1, 1]) {
        const [lx, ly] = pt(R + off * 12, deg);
        // Leaves sweep upward along the stem, like a laurel.
        const rot = deg + 90 + off * side * 38;
        out += `<ellipse cx="${f(lx)}" cy="${f(ly)}" rx="12" ry="5.2" transform="rotate(${f(rot)} ${f(lx)} ${f(ly)})" fill="${off > 0 ? leafColor : COLORS.leafDeep}"/>`;
      }
    }
  }
  return out;
}

// Rim lettering placed glyph-by-glyph (renders identically everywhere, no textPath support needed).
function arcText(text, r, centerDeg, size, color, bottom = true) {
  const widths = [...text].map((ch) => (ch === " " ? 0.42 : ch === "I" ? 0.42 : /[MW]/.test(ch) ? 0.95 : 0.74) * size + size * 0.12);
  const total = widths.reduce((a, b) => a + b, 0);
  const totalDeg = (total / r) * (180 / Math.PI);
  let deg = bottom ? centerDeg + totalDeg / 2 : centerDeg - totalDeg / 2;
  let out = "";
  [...text].forEach((ch, i) => {
    const step = (widths[i] / r) * (180 / Math.PI);
    const mid = bottom ? deg - step / 2 : deg + step / 2;
    const [x, y] = pt(r, mid);
    const rot = bottom ? mid - 90 : mid + 90;
    if (ch !== " ")
      out += `<text x="${f(x)}" y="${f(y)}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})" text-anchor="middle" dominant-baseline="central" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size}" fill="${color}">${ch}</text>`;
    deg = bottom ? deg - step : deg + step;
  });
  return out;
}

const medallion = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${defs}
  <circle cx="256" cy="256" r="252" fill="url(#zp-rim)"/>
  <circle cx="256" cy="256" r="244" fill="url(#zp-metal)"/>
  <circle cx="256" cy="256" r="196" fill="url(#zp-rim)"/>
  <circle cx="256" cy="256" r="191" fill="url(#zp-band)"/>
  ${wreath(COLORS.gold, COLORS.leaf)}
  <circle cx="256" cy="256" r="130" fill="url(#zp-rim)"/>
  <circle cx="256" cy="256" r="125" fill="url(#zp-face)"/>
  <g transform="translate(256 262) scale(0.82) translate(-256 -262)">${monogram(COLORS.cocoa, COLORS.gold, "#F7D9A6", COLORS.cocoa, COLORS.cocoa)}</g>
  ${arcText("ZEN PEN ENTERPRISE", 220, 90, 31, COLORS.cocoa, true)}
  ${arcText("SHOP CALM · LIVE BOLD", 220, 270, 21, COLORS.cocoaMid, false)}
  <circle cx="${f(pt(220, 178)[0])}" cy="${f(pt(220, 178)[1])}" r="4" fill="${COLORS.cocoa}"/>
  <circle cx="${f(pt(220, 2)[0])}" cy="${f(pt(220, 2)[1])}" r="4" fill="${COLORS.cocoa}"/>
</svg>`;

// Simplified mark: no small text or wreath, so it stays crisp at 16–48 px.
const mono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${defs}
  <circle cx="256" cy="256" r="252" fill="url(#zp-rim)"/>
  <circle cx="256" cy="256" r="240" fill="url(#zp-metal)"/>
  <circle cx="256" cy="256" r="222" fill="url(#zp-band)"/>
  <g transform="translate(256 268) scale(1.4) translate(-254 -284)">${monogram(COLORS.gold, COLORS.amber, COLORS.cream, COLORS.greenDeep, COLORS.cocoa)}</g>
</svg>`;

await writeFile(at("assets/zenpen-medallion.svg"), medallion);
await writeFile(at("assets/zenpen-monogram.svg"), mono);
console.log("Medallion + monogram SVGs written.");
