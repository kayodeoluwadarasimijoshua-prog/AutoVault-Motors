import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "dark" | "outline" | "outlineDark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-moss-500 text-ink-950 hover:bg-moss-400",
  light: "bg-bone-50 text-ink-950 hover:bg-white",
  dark: "bg-ink-950 text-bone-50 hover:bg-ink-800",
  outline: "border border-bone-300 bg-transparent text-ink-900 hover:border-ink-400 hover:bg-white",
  outlineDark: "border border-ink-700 bg-transparent text-ink-100 hover:border-ink-500 hover:bg-ink-900",
  ghost: "bg-transparent text-current hover:bg-current/10",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[13px] leading-none",
  md: "px-4 py-2.5 text-sm leading-none",
  lg: "px-5 py-3.5 text-[15px] leading-none",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonAnchorProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  size?: Size;
}

/** For external destinations such as WhatsApp. */
export function ButtonAnchor({ variant = "primary", size = "md", className, ...props }: ButtonAnchorProps) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
