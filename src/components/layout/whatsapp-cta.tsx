import { MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppCtaProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light" | "outlineDark";
  label?: string;
  context?: Parameters<typeof buildGeneralEnquiryMessage>[0];
  className?: string;
}

/**
 * Header/footer WhatsApp action. When no number is configured it degrades to a
 * functional link to the contact page rather than a dead button.
 */
export function WhatsAppCta({
  size = "sm",
  variant = "primary",
  label = "WhatsApp us",
  context = "header",
  className,
}: WhatsAppCtaProps) {
  const url = buildWhatsAppUrl(buildGeneralEnquiryMessage(context));

  if (!url) {
    return (
      <ButtonLink href="/contact" variant={variant} size={size} className={className}>
        <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
        Enquire
      </ButtonLink>
    );
  }

  return (
    <ButtonAnchor
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
      {label}
      <span className="sr-only">(opens WhatsApp in a new tab)</span>
    </ButtonAnchor>
  );
}
