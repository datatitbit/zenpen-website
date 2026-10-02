/* eslint-disable @next/next/no-img-element -- static export; pre-sized brand images */

/**
 * The owner's ZenPen medallion (copper + emerald, ZP monogram whose P ends in a pen nib).
 * Small sizes use the simplified ZP mark (also the favicon); `variant="medallion"` shows
 * the full badge with the laurel and ZEN PEN ENTERPRISE rim. Files are versioned (v2)
 * so browsers fetch the new logo instead of a cached old one.
 */
export function LogoMark({ className, variant = "monogram" }: { className?: string; variant?: "monogram" | "medallion" }) {
  return variant === "medallion" ? (
    <img src="/brand/zp-medallion-v2-320.webp" alt="" width={320} height={320} className={className} />
  ) : (
    <img src="/brand/zp-mark-v2-128.webp" alt="" width={128} height={128} className={className} />
  );
}

export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-11 flex-none drop-shadow-[0_4px_10px_rgb(184_101_42/0.35)]" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-bold tracking-tight ${tone === "dark" ? "text-white" : "text-ink"}`}>
          Zen<span className={tone === "dark" ? "text-gold-400" : "text-copper-600"}>Pen</span>
        </span>
        <span className={`mt-1 text-[0.58rem] font-semibold tracking-[0.3em] ${tone === "dark" ? "text-gold-300" : "text-copper-700"}`}>
          SHOP CALM · LIVE BOLD
        </span>
      </span>
    </span>
  );
}
