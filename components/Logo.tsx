import { useId } from "react";

/**
 * The ZenPen mark: an open "enso" ring (calm, completeness) around a bold Z
 * whose stroke ends in a coral ink-drop (the pen). Works from 16px favicons up.
 * `tone="dark"` = for dark backgrounds (white Z).
 */
export function LogoMark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2cc79a" />
          <stop offset="0.65" stopColor="#12a27a" />
          <stop offset="1" stopColor="#ff7a59" />
        </linearGradient>
      </defs>
      <path
        d="M48.6 13.4A26 26 0 1 0 57.4 37"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M21 21.5h21L22.5 42.5H40"
        fill="none"
        stroke={tone === "dark" ? "#ffffff" : "#0c1326"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46.5" cy="42.5" r="3.6" fill="#ff5d3a" />
    </svg>
  );
}

export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className="size-10 flex-none" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.45rem] font-bold tracking-tight ${tone === "dark" ? "text-white" : "text-ink"}`}
        >
          Zen<span className="text-jade-500">Pen</span>
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-semibold tracking-[0.3em] ${tone === "dark" ? "text-jade-300" : "text-brand-ink"}`}
        >
          SHOP CALM · LIVE BOLD
        </span>
      </span>
    </span>
  );
}
