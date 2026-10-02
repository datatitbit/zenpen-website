import { HeroShowcase } from "@/components/HeroShowcase";
import { Icon } from "@/components/Icon";
import { categoryArt } from "@/components/Illustrations";
import { T } from "@/components/Ph";
import { RequestForm } from "@/components/RequestForm";
import {
  bundles,
  categories,
  channels,
  contact,
  delivery,
  faqs,
  paymentMethods,
  promises,
  site,
  steps,
  whatsappLink,
  type Category,
} from "@/lib/site";

const accentBg: Record<Category["accent"], string> = {
  jade: "bg-jade-100 dark:bg-jade-500/15",
  coral: "bg-[#ffe6dd] dark:bg-coral-500/15",
  sun: "bg-[#fff1d1] dark:bg-sun-400/15",
};

const accentText: Record<Category["accent"], string> = {
  jade: "text-jade-700 dark:text-jade-300",
  coral: "text-coral-600 dark:text-coral-300",
  sun: "text-[#8a5a00] dark:text-sun-400",
};

function SectionHeading({ eyebrow, title, body, center = false }: { eyebrow: string; title: React.ReactNode; body?: React.ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.6rem]">
        {title}
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="zone-dark relative isolate overflow-hidden bg-ink-900 text-white">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="pattern-rings absolute inset-0 -z-10" />
        <div className="container-page grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="chip !border-white/15 !bg-white/5 text-jade-300">
              <span className="size-2 rounded-full bg-jade-400" />
              Ghana&apos;s calm way to shop
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[4.1rem]">
              Gadgets, style &amp; glow — <span className="text-gradient">delivered calm.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Genuine phones and accessories, fashion that fits your life, and beauty you can trust. Order on
              WhatsApp or online, pay with Mobile Money, and we&apos;ll bring it to your door.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Hello ZenPen, I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-coral"
              >
                <Icon name="chat" />
                Shop on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="#shop" className="btn btn-ghost-dark">
                Browse categories
                <Icon name="arrowRight" />
              </a>
            </div>
            <ul className="mt-10 grid max-w-xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {[
                { icon: "badge" as const, text: "Genuine, checked items" },
                { icon: "wallet" as const, text: "MoMo or pay on delivery" },
                { icon: "truck" as const, text: "Delivery across Ghana" },
              ].map((b) => (
                <li key={b.text} className="flex items-center gap-2.5">
                  <span className="grid size-8 flex-none place-items-center rounded-full bg-white/8 text-jade-300 ring-1 ring-white/10">
                    <Icon name={b.icon} className="size-4" />
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
          <HeroShowcase />
        </div>
      </section>

      {/* ───────────── Payment strip ───────────── */}
      <section aria-label="Ways to pay" className="overflow-hidden border-b border-line bg-surface py-5">
        <div className="marquee">
          {[...paymentMethods, ...paymentMethods, ...paymentMethods, ...paymentMethods].map((p, i) => (
            <span key={`${p}-${i}`} className="flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-muted" aria-hidden={i >= paymentMethods.length}>
              <Icon name="check" className="size-4 text-jade-500" />
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ───────────── Categories ───────────── */}
      <section id="shop" className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Shop by category"
          title="Three things you buy all the time — done properly."
          body="We focus on three categories so we can do them well: honest advice, genuine stock and fast delivery."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {categories.map((c) => {
            const Art = categoryArt[c.slug as keyof typeof categoryArt];
            return (
              <article key={c.slug} id={c.slug} className="card reveal !p-0 overflow-hidden">
                <div className={`relative grid place-items-center px-6 pt-8 pb-2 ${accentBg[c.accent]}`}>
                  <span className={`absolute top-5 left-5 text-xs font-bold tracking-[0.2em] uppercase ${accentText[c.accent]}`}>
                    {c.short}
                  </span>
                  <Art className="h-48 w-full max-w-[19rem]" />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <h3 className="font-display text-2xl leading-tight font-bold">{c.title}</h3>
                  <p className="leading-relaxed text-muted">{c.summary}</p>
                  <ul className="grid gap-2 text-[0.95rem]">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Icon name="check" className="mt-1 size-4 flex-none text-jade-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-sm">
                    <Icon name="shield" className="mt-0.5 size-4 flex-none text-brand-ink" />
                    <T v={c.assurance} />
                  </p>
                  <a
                    href={whatsappLink(`Hello ZenPen, I'm interested in ${c.title}. What do you have available?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-jade mt-auto"
                  >
                    See what&apos;s in stock
                    <Icon name="arrowRight" />
                    <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ───────────── Shop your way ───────────── */}
      <section className="bg-surface-2/60 py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Shop your way"
            title={
              <>
                Online first. <span className="text-brand-ink">Always reachable.</span>
              </>
            }
            body="Most of our customers shop from their phones — so that's where we're strongest. Prefer to see things in person? You can do that too."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {channels.map((ch) => (
              <li key={ch.title} className="card reveal">
                <div className="flex items-center justify-between">
                  <span className="icon-tile">
                    <Icon name={ch.icon} />
                  </span>
                  <span className="rounded-full bg-[#ffe6dd] px-2.5 py-1 text-xs font-bold text-coral-600 dark:bg-coral-500/15 dark:text-coral-300">
                    {ch.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold">{ch.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">{ch.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Bundles ───────────── */}
      <section id="bundles" className="container-page py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Curated bundles"
            title="Not sure where to start? Grab a bundle."
            body="Hand-picked sets that go together — better value than buying one by one."
          />
          <a
            href={whatsappLink("Hello ZenPen, can you build me a custom bundle?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline self-start md:self-end"
          >
            <Icon name="gift" />
            Build a custom bundle
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {bundles.map((b) => (
            <article key={b.name} className="card reveal">
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-2xl ${accentBg[b.accent]} ${accentText[b.accent]}`}>
                  <Icon name={b.icon} className="size-6" />
                </span>
                <span className="text-right text-sm text-muted">
                  from <span className="block font-display text-2xl"><T v={b.price} /></span>
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold">{b.name}</h3>
              <p className="text-[0.95rem] leading-relaxed text-muted">{b.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {b.contents.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(`Hello ZenPen, I'd like the ${b.name} bundle.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-brand-ink hover:underline"
              >
                Order this bundle <Icon name="arrowRight" className="size-4" />
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── Why ZenPen ───────────── */}
      <section id="why" className="zone-dark relative isolate overflow-hidden bg-ink-900 py-20 text-white sm:py-28">
        <div className="hero-glow absolute inset-0 -z-10 opacity-70" />
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow !text-jade-300">The ZenPen promise</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.6rem]">
              Shopping online should feel <span className="text-gradient">calm, not risky.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              That&apos;s the &ldquo;zen&rdquo; in ZenPen. Here&apos;s what you can count on every time you order.
            </p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((p) => (
              <li key={p.title} className="reveal rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-jade-400/50">
                <span className="grid size-12 place-items-center rounded-2xl bg-jade-500/15 text-jade-300">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">
                  <T v={p.body} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section id="how" className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="How it works" title="From “I want that” to “it's here” in four steps." center />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
          <span className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-jade-400 via-coral-400 to-sun-400 md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="reveal relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full border-4 border-bg bg-ink-900 font-display text-xl font-bold text-white ring-2 ring-jade-400">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 grid gap-4 rounded-3xl border border-line bg-surface p-6 sm:grid-cols-3 sm:p-8">
          {[
            { icon: "truck" as const, label: "Accra & Tema", v: delivery.accra },
            { icon: "globe" as const, label: "Nationwide", v: delivery.nationwide },
            { icon: "refresh" as const, label: "Returns", v: delivery.returns },
          ].map((d) => (
            <div key={d.label} className="flex items-start gap-3">
              <span className="icon-tile !size-10 flex-none">
                <Icon name={d.icon} className="!size-5" />
              </span>
              <p className="text-sm leading-relaxed">
                <span className="block font-semibold">{d.label}</span>
                <T v={d.v} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Bulk & gifting ───────────── */}
      <section className="container-page pb-20 sm:pb-28">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-jade-600 to-jade-700 p-8 text-white sm:p-12">
          <div className="pattern-rings absolute inset-0 -z-10 !opacity-20" />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-jade-100 uppercase">For businesses &amp; resellers</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-bold sm:text-4xl">
                Staff gifts, event favours and bulk orders, sorted.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-jade-100">
                Corporate gift boxes, branded tech accessories, and wedding or funeral souvenirs — tell us what you
                need and we&apos;ll put together a quote.
              </p>
              <p className="mt-5 inline-flex max-w-xl items-start gap-2.5 rounded-2xl bg-white/10 px-4 py-3 text-[0.95rem] leading-relaxed ring-1 ring-white/20">
                <Icon name="store" className="mt-0.5 size-5 flex-none text-sun-400" />
                <span>
                  <strong>Wholesale is coming.</strong> Run a shop or resell online? Join the reseller waitlist and be
                  first to get ZenPen trade prices when they launch.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={whatsappLink("Hello ZenPen, I'd like a quote for a bulk / corporate order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-coral"
              >
                <Icon name="gift" />
                Request a bulk quote
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
              <a
                href={whatsappLink("Hello ZenPen, please add me to the reseller / wholesale waitlist. My business is: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                <Icon name="store" />
                Join the reseller waitlist
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="bg-surface-2/60 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Good questions, straight answers."
            body={
              <>
                Can&apos;t find yours?{" "}
                <a href={whatsappLink("Hello ZenPen, I have a question.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-ink underline">
                  Ask us on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </>
            }
          />
          <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                  {f.q}
                  <span className="grid size-8 flex-none place-items-center rounded-full bg-surface-2 transition-transform group-open:rotate-45">
                    <Icon name="close" className="size-4 rotate-45" />
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">
                  <T v={f.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Contact / order ───────────── */}
      <section id="contact" className="zone-dark relative isolate overflow-hidden bg-ink-900 py-20 text-white sm:py-28">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow !text-jade-300">Order &amp; contact</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight sm:text-[2.6rem]">
              Tell us what you&apos;re after. <span className="text-gradient">We&apos;ll handle the rest.</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-300">
              Send the form, or reach us directly — we reply fastest on WhatsApp.
            </p>
            <ul className="mt-10 grid gap-3">
              {[
                { icon: "chat" as const, label: "WhatsApp", value: contact.whatsapp.display, href: whatsappLink(), ext: true },
                { icon: "phone" as const, label: "Call", value: contact.phone.display, href: contact.phone.href },
                { icon: "mail" as const, label: "Email", value: contact.email.display, href: contact.email.href },
              ].map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-jade-400/60"
                  >
                    <span className="grid size-11 flex-none place-items-center rounded-xl bg-jade-500/15 text-jade-300">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase">{c.label}</span>
                      <span className="font-semibold">{c.value}</span>
                    </span>
                    {c.ext && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-jade-500/15 text-jade-300">
                  <Icon name="pin" className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase">Pickup</span>
                  <T v={contact.address} />
                  <span className="mt-0.5 block text-sm">
                    <T v={contact.hours} />
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <RequestForm />
        </div>
      </section>

      <p className="sr-only">
        {site.legalName} — {site.tagline}
      </p>
    </>
  );
}
