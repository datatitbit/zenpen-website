/**
 * Single source of truth for ZenPen's business details and page copy.
 *
 * Provenance:
 * - Registered name, email, domain and phone come from the owner (chat, 2026-10-02).
 * - The three business areas (Mobile Electronics & Accessories, Fashion & Apparel,
 *   Beauty & Personal Care), the Ghana focus and the digital-first approach come
 *   from the owner's brief (same date).
 * - Anything wrapped in `ph(...)` is a PROPOSAL awaiting the owner's confirmation.
 *   It renders in bold red ink on the page and is listed in
 *   "ZenPen - Placeholders to Review.docx" in the zenpen cowork folder.
 * - No reviews, customer counts or awards are shown: none exist yet, and
 *   inventing them would mislead customers.
 */

/** A piece of copy that is either confirmed (plain string) or a red-ink proposal. */
export type Copy = string | { ph: string };
export const ph = (text: string): Copy => ({ ph: text });
export const plain = (c: Copy) => (typeof c === "string" ? c : c.ph);

export const site = {
  name: "ZenPen",
  legalName: "Zen Pen Enterprise",
  shortName: "ZenPen",
  tagline: "Shop calm. Live bold.",
  description:
    "ZenPen is a Ghanaian online-first store for genuine phones and accessories, fashion and beauty — order on WhatsApp or online and pay with Mobile Money. Launching soon.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zenpengh.com",
  /** While true, search engines are asked not to index the site (red-ink details still pending). */
  isPreview: true,
} as const;

const WHATSAPP_NUMBER = "233243506373";

export const contact = {
  phone: { display: "+233 24 350 6373", href: "tel:+233243506373" },
  whatsapp: { display: "+233 24 350 6373" },
  email: { display: "zenpengh@gmail.com", href: "mailto:zenpengh@gmail.com" },
  address: ph("East Legon, Accra — pickup point"),
  hours: ph("Online 24/7 · Pickup Mon – Sat, 9:00 AM – 7:00 PM"),
};

/** No delivery promises until partners and fees are confirmed (owner, 2026-10-02). */
export const launch = {
  status: "Launching soon",
  delivery: "Delivery options, areas and fees — coming soon",
  checkout: "Online checkout — coming soon",
  returns: ph("7-day returns on unused items"),
};

export const socials: { name: string; icon: IconName; href: string; handle: Copy }[] = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/zenpengh/", handle: ph("@zenpengh") },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@zenpengh", handle: ph("@zenpengh") },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/zenpengh", handle: ph("ZenPen GH") },
  { name: "X (Twitter)", icon: "twitter", href: "https://x.com/zenpengh", handle: ph("@zenpengh") },
];

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function emailLink(subject: string, body: string) {
  return `${contact.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type IconName =
  | "smartphone"
  | "headphones"
  | "watch"
  | "shirt"
  | "bag"
  | "sparkles"
  | "droplet"
  | "truck"
  | "chat"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "arrowRight"
  | "menu"
  | "close"
  | "shield"
  | "check"
  | "info"
  | "wallet"
  | "refresh"
  | "badge"
  | "store"
  | "gift"
  | "heart"
  | "search"
  | "instagram"
  | "twitter"
  | "facebook"
  | "tiktok"
  | "globe";

export interface Category {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  summary: string;
  icon: IconName;
  items: string[];
  /** Short trust line specific to the category. */
  assurance: Copy;
  accent: "jade" | "coral" | "sun";
}

export const categories: Category[] = [
  {
    slug: "electronics",
    title: "Mobile Electronics & Accessories",
    short: "Tech",
    tagline: "Phones, power & sound that keep up with you",
    summary:
      "Smartphones and everything around them — chargers, power banks, earbuds, smartwatches and speakers — checked before they leave us.",
    icon: "smartphone",
    items: [
      "Smartphones & tablets",
      "Earbuds & headphones",
      "Power banks & fast chargers",
      "Smartwatches & fitness bands",
      "Bluetooth speakers",
      "Cases, cables & screen guards",
    ],
    assurance: ph("Every device tested before dispatch · warranty on electronics"),
    accent: "jade",
  },
  {
    slug: "fashion",
    title: "Fashion & Apparel",
    short: "Style",
    tagline: "Everyday fits and statement pieces",
    summary:
      "Clothing, footwear and accessories for work, campus and the weekend — including pieces from Ghanaian designers and African-print favourites.",
    icon: "shirt",
    items: [
      "Men's & women's clothing",
      "African-print & made-in-Ghana pieces",
      "Sneakers, sandals & heels",
      "Bags & backpacks",
      "Watches, sunglasses & jewellery",
      "Seasonal & festive collections",
    ],
    assurance: ph("Size guide on every item · easy exchanges"),
    accent: "coral",
  },
  {
    slug: "beauty",
    title: "Beauty & Personal Care",
    short: "Glow",
    tagline: "Skincare, haircare and fragrance you can trust",
    summary:
      "Skincare, haircare, make-up, fragrance and grooming — sourced from authorised suppliers, with natural Ghanaian favourites like shea and black soap.",
    icon: "sparkles",
    items: [
      "Skincare & body care",
      "Shea butter & black soap",
      "Haircare, wigs & extensions",
      "Make-up & nails",
      "Perfumes & body mists",
      "Men's grooming",
    ],
    assurance: ph("Only FDA Ghana-registered cosmetics · sealed and in date"),
    accent: "sun",
  },
];

/** How customers can shop — digital first, physical second. */
export const channels: { title: string; body: string; icon: IconName; tag: string }[] = [
  {
    title: "WhatsApp shopping",
    body: "Chat with a real person, get photos and prices, and order in minutes.",
    icon: "chat",
    tag: "Fastest",
  },
  {
    title: "Instagram & TikTok",
    body: "See new drops, styling ideas and honest product demos first.",
    icon: "instagram",
    tag: "New drops",
  },
  {
    title: "This website",
    body: "Browse categories and send an order request any time, day or night.",
    icon: "globe",
    tag: "24/7",
  },
  {
    title: "Pickup & pop-ups",
    body: "Collect your order in person, or meet us at our pop-up shop events.",
    icon: "store",
    tag: "In person",
  },
];

export const promises: { title: string; body: Copy; icon: IconName }[] = [
  {
    title: "Genuine, checked products",
    body: "We source from trusted suppliers and inspect items before they're sent — no surprises at your door.",
    icon: "badge",
  },
  {
    title: "Pay the Ghana way",
    body: ph("MTN MoMo, Telecel Cash, AirtelTigo Money or bank transfer. Card payments coming soon."),
    icon: "wallet",
  },
  {
    title: "Curated, not cluttered",
    body: "A focused range of products we'd buy ourselves — and ready-made bundles so choosing is easy.",
    icon: "sparkles",
  },
  {
    title: "Easy returns",
    body: ph("Changed your mind? Return unused items within 7 days."),
    icon: "refresh",
  },
  {
    title: "Real people, real answers",
    body: "Ask anything on WhatsApp before you buy — sizes, specs, shades or availability.",
    icon: "chat",
  },
  {
    title: "Your data stays private",
    body: "We only use your details to fulfil your order. No spam, never sold.",
    icon: "shield",
  },
];

export const steps: { title: string; body: string }[] = [
  { title: "Browse", body: "Pick a category here, or see the latest drops on Instagram and TikTok." },
  { title: "Chat & order", body: "Send us a WhatsApp message or the order form — we confirm the price and availability." },
  { title: "Pay securely", body: "Pay with Mobile Money or bank transfer from our official numbers only." },
  { title: "Enjoy", body: "Your order is packed with care. Questions after? We're one message away." },
];

/** Curated bundles: real product ideas, prices still to be set by the owner. */
export const bundles: { name: string; blurb: string; contents: string[]; price: Copy; icon: IconName; accent: Category["accent"] }[] = [
  {
    name: "Campus Tech Kit",
    blurb: "Everything a student needs to stay charged and connected.",
    contents: ["Wireless earbuds", "10,000 mAh power bank", "Fast-charge cable"],
    price: ph("GH₵ 450"),
    icon: "headphones",
    accent: "jade",
  },
  {
    name: "Detty December Fit",
    blurb: "A ready-to-wear festive look, styled for the season.",
    contents: ["Statement shirt or dress", "Sneakers or sandals", "Sunglasses"],
    price: ph("GH₵ 850"),
    icon: "bag",
    accent: "coral",
  },
  {
    name: "Everyday Glow Set",
    blurb: "A simple routine for healthy, glowing skin.",
    contents: ["Gentle cleanser", "Shea body butter", "Lip & body mist"],
    price: ph("GH₵ 300"),
    icon: "droplet",
    accent: "sun",
  },
];

export const paymentMethods = ["MTN MoMo", "Telecel Cash", "AirtelTigo Money", "Bank transfer", "Genuine products", "Real people on WhatsApp"];

export const faqs: { q: string; a: Copy }[] = [
  {
    q: "How do I place an order?",
    a: `ZenPen is launching soon. You can already message us on WhatsApp at ${contact.whatsapp.display} or use the order form on this page — we'll confirm availability and price, then send you a payment request.`,
  },
  {
    q: "Are your products genuine?",
    a: "Yes. We buy from trusted suppliers and check items before dispatch. If anything isn't right when it arrives, tell us straight away and we'll make it right.",
  },
  {
    q: "How can I pay?",
    a: ph(
      "Mobile Money (MTN MoMo, Telecel Cash, AirtelTigo Money) or bank transfer. Card payments are coming soon. We'll never ask for your PIN.",
    ),
  },
  {
    q: "Do you deliver?",
    a: "Delivery options, areas and fees are being finalised and will be announced before launch. Message us on WhatsApp for the latest.",
  },
  {
    q: "Can I return or exchange an item?",
    a: ph("Yes — unused items in their original packaging can be returned or exchanged within 7 days. Hygiene items such as opened cosmetics and earbuds can only be returned if faulty."),
  },
  {
    q: "Do electronics come with a warranty?",
    a: ph("Yes. Warranty length depends on the item and is confirmed before you pay."),
  },
  {
    q: "Are your beauty products safe?",
    a: ph("We only stock cosmetics registered with the Food and Drugs Authority (FDA) Ghana, sealed and within their expiry date."),
  },
  {
    q: "Do you have a physical shop?",
    a: ph("We're online-first, with a pickup point in East Legon, Accra and regular pop-up shop events. Follow us on Instagram for dates."),
  },
  {
    q: "Do you take bulk, corporate or gift orders?",
    a: "Yes — staff gifts, event favours and bulk orders are welcome. Message us with what you need and your quantity.",
  },
  {
    q: "Do you sell wholesale to resellers?",
    a: "Not yet — we're focused on retail for now, and wholesale trade pricing is planned. Message us on WhatsApp to join the reseller waitlist and you'll be the first to know.",
  },
];
