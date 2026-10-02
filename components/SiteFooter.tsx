import Link from "next/link";
import { CommunitySignup } from "@/components/CommunitySignup";
import { Icon } from "@/components/Icon";
import { Logo, LogoMark } from "@/components/Logo";
import { T } from "@/components/Ph";
import { categories, contact, paymentMethods, site, socials, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="zone-dark bg-ink-950 text-slate-300">
      <div className="border-b border-white/10 bg-white/[0.03]">
        <div className="container-page flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow !text-jade-300">The ZenPen insider list</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">First dibs on new drops &amp; deals</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Join with your email or WhatsApp number. Occasional updates only — leave any time.
            </p>
          </div>
          <CommunitySignup />
        </div>
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="ZenPen home" className="inline-flex items-center gap-4">
            <LogoMark variant="medallion" className="size-24 flex-none" />
            <Logo tone="dark" className="[&>img]:hidden" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            Genuine tech, everyday style and trusted beauty — delivered across Ghana by {site.legalName}.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.name} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full border border-[#ff7b7b]/60 bg-white/[0.04] text-[#ff7b7b] transition-colors hover:border-jade-400 hover:text-jade-300"
                >
                  <Icon name={s.icon} className="size-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Shop</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/#${c.slug}`} className="hover:text-jade-300">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#bundles" className="hover:text-jade-300">
                Curated bundles
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Help</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#how" className="hover:text-jade-300">How to order</Link></li>
            <li><Link href="/#faq" className="hover:text-jade-300">Delivery &amp; returns</Link></li>
            <li><Link href="/#contact" className="hover:text-jade-300">Bulk &amp; gift orders</Link></li>
            <li><Link href="/privacy/" className="hover:text-jade-300">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Icon name="chat" className="mt-0.5 size-4 flex-none text-jade-300" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-jade-300">
                WhatsApp {contact.whatsapp.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="phone" className="mt-0.5 size-4 flex-none text-jade-300" />
              <a href={contact.phone.href} className="hover:text-jade-300">{contact.phone.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="mail" className="mt-0.5 size-4 flex-none text-jade-300" />
              <a href={contact.email.href} className="break-all hover:text-jade-300">{contact.email.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 size-4 flex-none text-jade-300" />
              <T v={contact.address} />
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="clock" className="mt-0.5 size-4 flex-none text-jade-300" />
              <T v={contact.hours} />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs leading-relaxed text-slate-400 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {paymentMethods.map((p) => (
              <li key={p} className="rounded-md border border-white/12 px-2 py-1 text-[0.7rem] font-semibold text-slate-300">
                {p}
              </li>
            ))}
          </ul>
          <p className="flex-none">
            © {year} {site.legalName}. Registered in Ghana · <strong className="ph">BN 000000000</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
