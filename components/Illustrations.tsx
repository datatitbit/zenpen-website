/**
 * Hand-drawn product illustrations for the three ZenPen categories.
 * Used until the owner's own product photography is ready (tracked in the
 * placeholders review doc). Pure SVG: crisp at any size, almost no weight.
 */

type Art = { className?: string };

export function ElectronicsArt({ className }: Art) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="el-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2cc79a" />
          <stop offset="1" stopColor="#0c1326" />
        </linearGradient>
        <linearGradient id="el-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2b4f" />
          <stop offset="1" stopColor="#0c1326" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="214" rx="120" ry="12" fill="#0c1326" opacity="0.12" />
      {/* phone */}
      <g transform="rotate(-8 140 120)">
        <rect x="98" y="26" width="92" height="178" rx="18" fill="url(#el-body)" />
        <rect x="104" y="32" width="80" height="166" rx="13" fill="url(#el-screen)" />
        <rect x="130" y="38" width="28" height="7" rx="3.5" fill="#0c1326" />
        <circle cx="144" cy="104" r="22" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="4" strokeDasharray="110 40" strokeLinecap="round" />
        <rect x="118" y="150" width="52" height="8" rx="4" fill="#fff" opacity="0.75" />
        <rect x="126" y="164" width="36" height="6" rx="3" fill="#fff" opacity="0.45" />
      </g>
      {/* earbuds case */}
      <g>
        <rect x="200" y="140" width="76" height="62" rx="26" fill="#ffffff" stroke="#e6ddd0" strokeWidth="2" />
        <path d="M200 166h76" stroke="#e6ddd0" strokeWidth="2" />
        <circle cx="238" cy="182" r="3" fill="#2cc79a" />
        <path d="M222 128c-8 0-12 6-12 12s4 10 10 10l4-1 0 14a4 4 0 0 0 8 0v-22c0-8-4-13-10-13z" fill="#ffffff" stroke="#d8cfc0" strokeWidth="2" />
        <path d="M256 124c8 0 12 6 12 12s-4 10-10 10l-4-1v14a4 4 0 0 1-8 0v-22c0-8 4-13 10-13z" fill="#ffffff" stroke="#d8cfc0" strokeWidth="2" />
      </g>
      {/* watch */}
      <g>
        <rect x="40" y="96" width="30" height="104" rx="12" fill="#ff7a59" />
        <rect x="30" y="122" width="50" height="54" rx="14" fill="#0c1326" />
        <rect x="35" y="127" width="40" height="44" rx="10" fill="#141e3a" />
        <path d="M48 149a7 7 0 1 0 14 0" stroke="#86e6c8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="55" cy="140" r="2.5" fill="#ffc24b" />
      </g>
      <circle cx="286" cy="58" r="6" fill="#ffc24b" />
      <circle cx="54" cy="52" r="4" fill="#2cc79a" />
    </svg>
  );
}

export function FashionArt({ className }: Art) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="fa-print" width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill="#ff7a59" />
          <path d="M0 11h22M11 0v22" stroke="#0c1326" strokeWidth="2.5" />
          <rect x="6" y="6" width="10" height="10" fill="#ffc24b" />
          <rect x="9" y="9" width="4" height="4" fill="#12a27a" />
        </pattern>
      </defs>
      <ellipse cx="160" cy="214" rx="124" ry="12" fill="#0c1326" opacity="0.12" />
      {/* shirt on hanger */}
      <path d="M150 22a10 10 0 1 1 10 10v8" fill="none" stroke="#0c1326" strokeWidth="4" strokeLinecap="round" />
      <path d="M106 40h108l-54 12z" fill="#0c1326" opacity="0.18" />
      <path
        d="M126 44 92 60 80 98l26 8v94h108v-94l26-8-12-38-34-16c-4 12-14 20-27 20s-23-8-27-20z"
        fill="url(#fa-print)"
        stroke="#0c1326"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M133 44c5 10 15 15 27 15s22-5 27-15" fill="none" stroke="#0c1326" strokeWidth="3" />
      {/* sneaker */}
      <g transform="translate(180 150)">
        <path d="M6 44c0-10 4-24 12-30l18 10c8 4 20 6 32 8 16 3 30 8 34 20v6H10a4 4 0 0 1-4-4z" fill="#ffffff" stroke="#0c1326" strokeWidth="3" strokeLinejoin="round" />
        <path d="M6 48h96v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#12a27a" stroke="#0c1326" strokeWidth="3" strokeLinejoin="round" />
        <path d="M34 22l-6 10M44 26l-6 10M54 29l-5 9" stroke="#0c1326" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* sunglasses */}
      <g transform="translate(26 166)">
        <rect x="0" y="6" width="40" height="28" rx="12" fill="#0c1326" />
        <rect x="50" y="6" width="40" height="28" rx="12" fill="#0c1326" />
        <path d="M40 16h10" stroke="#0c1326" strokeWidth="4" />
        <path d="M8 14l10 0" stroke="#86e6c8" strokeWidth="3" strokeLinecap="round" />
        <path d="M58 14l10 0" stroke="#86e6c8" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="270" cy="60" r="6" fill="#2cc79a" />
      <circle cx="52" cy="58" r="5" fill="#ffc24b" />
    </svg>
  );
}

export function BeautyArt({ className }: Art) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="be-amber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc24b" />
          <stop offset="1" stopColor="#d9401d" />
        </linearGradient>
        <linearGradient id="be-jar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3ede4" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="214" rx="124" ry="12" fill="#0c1326" opacity="0.12" />
      {/* leaves */}
      <path d="M232 70c30-20 60-10 66 0-20 4-40 20-66 0z" fill="#12a27a" />
      <path d="M232 70c10-26 34-40 50-38-6 18-26 36-50 38z" fill="#2cc79a" />
      {/* serum dropper */}
      <g>
        <rect x="128" y="22" width="20" height="30" rx="9" fill="#0c1326" />
        <rect x="124" y="48" width="28" height="16" rx="3" fill="#141e3a" />
        <rect x="104" y="62" width="68" height="140" rx="16" fill="url(#be-amber)" />
        <rect x="114" y="104" width="48" height="56" rx="6" fill="#fff" opacity="0.92" />
        <path d="M126 122h24M126 132h16" stroke="#0c1326" strokeWidth="3" strokeLinecap="round" />
        <rect x="112" y="72" width="8" height="110" rx="4" fill="#fff" opacity="0.35" />
      </g>
      {/* shea jar */}
      <g>
        <rect x="186" y="150" width="96" height="16" rx="6" fill="#12a27a" />
        <rect x="190" y="164" width="88" height="40" rx="10" fill="url(#be-jar)" stroke="#e6ddd0" strokeWidth="2" />
        <circle cx="234" cy="184" r="9" fill="#ffc24b" />
      </g>
      {/* lipstick */}
      <g transform="rotate(10 64 150)">
        <rect x="46" y="150" width="34" height="54" rx="6" fill="#0c1326" />
        <rect x="50" y="128" width="26" height="26" rx="3" fill="#ffc24b" />
        <path d="M53 128V104c0-6 6-12 14-14v38z" fill="#d9401d" />
      </g>
      <circle cx="40" cy="70" r="5" fill="#ff7a59" />
      <circle cx="200" cy="40" r="4" fill="#ffc24b" />
    </svg>
  );
}

export const categoryArt = {
  electronics: ElectronicsArt,
  fashion: FashionArt,
  beauty: BeautyArt,
} as const;
