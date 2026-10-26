import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "w-full rounded-lg border bg-white px-3.5 text-sm text-ink-900 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] transition-colors placeholder:text-ink-500 focus:border-moss-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-bone-100 disabled:text-ink-400";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

/** Shared label + hint + error wrapper so every control is announced consistently. */
export function FieldShell({ id, label, hint, error, optional, children, className }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-[13px] font-medium text-ink-800">
        <span>{label}</span>
        {optional ? <span className="text-[11px] font-normal text-ink-500">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(
        controlBase,
        "h-11",
        invalid ? "border-red-600 bg-red-50/40 focus:border-red-700" : "border-ink-400",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        controlBase,
        "min-h-32 py-3",
        invalid ? "border-red-600 bg-red-50/40 focus:border-red-700" : "border-ink-400",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  invalid?: boolean;
}

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlBase,
          "h-11 appearance-none pr-10",
          invalid ? "border-red-600" : "border-ink-400",
          className,
        )}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
