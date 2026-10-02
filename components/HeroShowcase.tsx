import { Icon } from "@/components/Icon";
import { BeautyArt, ElectronicsArt, FashionArt } from "@/components/Illustrations";
import { LogoMark } from "@/components/Logo";

/**
 * Hero visual: a phone showing what shopping ZenPen feels like, with two
 * floating status cards. Illustrative UI only — no real orders or prices.
 */
export function HeroShowcase() {
  const rows = [
    { Art: ElectronicsArt, name: "Wireless earbuds", tag: "Tech", bg: "bg-jade-100" },
    { Art: FashionArt, name: "Print shirt & kicks", tag: "Style", bg: "bg-[#ffe6dd]" },
    { Art: BeautyArt, name: "Glow serum set", tag: "Glow", bg: "bg-[#fff1d1]" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[24rem]" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-jade-500/25 blur-3xl" />

      <div className="float-slow relative mx-auto w-[17.5rem] rounded-[2.6rem] border border-white/15 bg-ink-800 p-2.5 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.8)] sm:w-[19rem]">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#faf6f0] text-ink-900">
          <div className="flex items-center justify-between px-5 pt-4 text-[0.65rem] font-semibold">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-ink-900" />
            <span>5G</span>
          </div>
          <div className="flex items-center gap-2 px-5 pt-4">
            <LogoMark className="size-7" />
            <span className="font-display text-lg font-bold">
              Zen<span className="text-copper-600">Pen</span>
            </span>
            <span className="ml-auto grid size-8 place-items-center rounded-full bg-white shadow-sm">
              <Icon name="bag" className="size-4" />
            </span>
          </div>
          <div className="mx-5 mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[0.7rem] text-slate-500 shadow-sm">
            <Icon name="search" className="size-3.5" /> Search phones, fits, glow…
          </div>
          <div className="mx-5 mt-3 rounded-2xl bg-gradient-to-br from-jade-600 to-ink-900 p-4 text-white">
            <p className="text-[0.6rem] font-semibold tracking-[0.2em] text-jade-300">NEW DROP</p>
            <p className="mt-1 font-display text-base leading-tight font-bold">Tech, style &amp; glow — all in one bag</p>
            <span className="mt-2 inline-block rounded-full bg-coral-400 px-3 py-1 text-[0.6rem] font-bold text-ink-900">
              Shop now
            </span>
          </div>
          <ul className="space-y-2.5 px-5 pt-4 pb-6">
            {rows.map(({ Art, name, tag, bg }) => (
              <li key={name} className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm">
                <span className={`grid size-12 flex-none place-items-center rounded-xl ${bg}`}>
                  <Art className="size-11" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.75rem] font-semibold">{name}</span>
                  <span className="text-[0.62rem] text-slate-500">{tag} · Ready to deliver</span>
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-ink-900 text-white">
                  <Icon name="arrowRight" className="size-3.5" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="float-slower absolute -top-5 -left-2 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-ink-900 shadow-xl sm:-left-10">
        <span className="grid size-8 place-items-center rounded-full bg-sun-400">
          <Icon name="wallet" className="size-4" />
        </span>
        <span className="text-[0.72rem] leading-tight">
          <span className="block font-bold">Paid with MoMo</span>
          <span className="text-slate-500">Secure &amp; instant</span>
        </span>
      </div>

      <div className="float-slow absolute -right-2 bottom-6 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-ink-900 shadow-xl sm:-right-8">
        <span className="grid size-8 place-items-center rounded-full bg-jade-500 text-white">
          <Icon name="truck" className="size-4" />
        </span>
        <span className="text-[0.72rem] leading-tight">
          <span className="block font-bold">Out for delivery</span>
          <span className="text-slate-500">Track it on WhatsApp</span>
        </span>
      </div>
    </div>
  );
}
