import { Icon } from "@/components/Icon";
import { whatsappLink } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hello ZenPen, I have a question about a product.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#0b7a43] px-4 py-3.5 font-semibold text-white shadow-[0_16px_40px_-12px_rgb(0_0_0/0.55)] ring-1 ring-white/20 transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <Icon name="chat" className="size-6" />
      <span className="hidden sm:inline">Chat to shop</span>
      <span className="sr-only sm:hidden">Chat to shop on WhatsApp</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
