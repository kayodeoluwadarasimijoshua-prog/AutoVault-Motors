import { DesktopNav } from "@/components/layout/desktop-nav";
import { Logo } from "@/components/layout/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/95 text-bone-50 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <WhatsAppCta size="sm" label="WhatsApp us" className="hidden sm:inline-flex" />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
