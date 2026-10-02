"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { T } from "@/components/Ph";
import { delivery, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/#shop", label: "Shop" },
  { href: "/#bundles", label: "Bundles" },
  { href: "/#why", label: "Why ZenPen" },
  { href: "/#how", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

const orderText = "Hello ZenPen, I'd like to place an order.";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="zone-dark bg-jade-700 text-center text-[0.82rem] font-medium text-white">
        <p className="container-page flex items-center justify-center gap-2 py-2">
          <Icon name="truck" className="size-4 flex-none" />
          <span>
            <T v={delivery.freeOver} /> · Pay with MoMo
          </span>
        </p>
      </div>
      <header className="zone-dark sticky top-0 z-50 border-b border-white/10 bg-ink-900/85 text-white backdrop-blur-lg">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label="ZenPen home">
            <Logo tone="dark" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-full px-4 py-2 text-[0.93rem] font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(orderText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-coral hidden !min-h-11 !px-5 sm:inline-flex"
            >
              <Icon name="chat" />
              Order on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} className="size-5" />
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>

        <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-white/10 bg-ink-900 lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {[...nav, { href: "/#contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-2 py-3.5 text-base font-medium text-slate-100 hover:bg-white/5"
                >
                  {item.label}
                  <Icon name="arrowRight" className="size-4 text-jade-300" />
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-1 sm:hidden">
              <a href={whatsappLink(orderText)} target="_blank" rel="noopener noreferrer" className="btn btn-coral w-full">
                <Icon name="chat" />
                Order on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
