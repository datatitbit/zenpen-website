// Zero-dependency static server for the built site in out/ (mimics the cPanel host).
// Usage: node scripts/serve-out.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../out/", import.meta.url));
const PORT = Number(process.argv[2] ?? 7310);
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".webmanifest": "application/manifest+json", ".json": "application/json" };

createServer(async (req, res) => {
  let p = join(ROOT, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^[\\/]+/, ""));
  if (!p.startsWith(ROOT)) return res.writeHead(403).end();
  try {
    if ((await stat(p)).isDirectory()) p = join(p, "index.html");
    res.writeHead(200, { "Content-Type": MIME[extname(p)] ?? "application/octet-stream" }).end(await readFile(p));
  } catch {
    res.writeHead(404, { "Content-Type": MIME[".html"] }).end(await readFile(join(ROOT, "404.html")).catch(() => "Not found"));
  }
}).listen(PORT, "127.0.0.1", () => console.log(`Serving out/ on http://127.0.0.1:${PORT}`));
