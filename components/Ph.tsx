import type { Copy } from "@/lib/site";

/** Renders confirmed copy as-is, and pending proposals in bold red ink. */
export function T({ v }: { v: Copy }) {
  if (typeof v === "string") return <>{v}</>;
  return <strong className="ph">{v.ph}</strong>;
}
