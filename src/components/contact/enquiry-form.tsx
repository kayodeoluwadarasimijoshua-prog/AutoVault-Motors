"use client";

import { useState } from "react";
import { Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldShell, Input, Textarea } from "@/components/ui/input";
import { CONTACT_EMAIL, isEmailConfigured } from "@/lib/config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Status = "idle" | "invalid" | "mailto" | "whatsapp" | "unavailable";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", subject: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Enter an email address in the format name@example.com.";
  if (values.subject.trim().length < 3) errors.subject = "Add a short subject.";
  if (values.message.trim().length < 20)
    errors.message = "Add a message of at least 20 characters so the dealership can help.";
  return errors;
}

/** Composes a plain-text enquiry body shared by the email and WhatsApp routes. */
function composeMessage(values: FormValues): string {
  return `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
}

/**
 * Demonstration enquiry form. It validates input, then hands the message to the
 * visitor's email client or to WhatsApp. Nothing is posted to a server, and no
 * success confirmation is ever shown for a delivery that did not happen.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const emailReady = isEmailConfigured();

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status !== "idle") setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("invalid");
      const firstKey = (Object.keys(nextErrors) as (keyof FormValues)[])[0];
      document.getElementById(`enquiry-${firstKey}`)?.focus();
      return;
    }

    setErrors({});
    const subject = `Website enquiry: ${values.subject.trim()}`;
    const body = composeMessage(values);

    if (emailReady) {
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus("mailto");
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(`${subject}\n\n${body}`);
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      return;
    }

    setStatus("unavailable");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="enquiry-form-heading"
      className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5 shadow-[var(--shadow-panel)] sm:p-6"
    >
      <h2 id="enquiry-form-heading" className="text-lg font-semibold tracking-[-0.015em] text-ink-950">
        Send an enquiry
      </h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
        Tell the team which vehicle you are interested in and what you would like to know.
      </p>

      <p className="mt-3 flex items-start gap-2 rounded-md border border-bone-300 bg-bone-100 px-3 py-2.5 text-[12px] leading-relaxed text-ink-600">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-ink-500" strokeWidth={1.9} />
        Demonstration form: nothing is stored or sent to a server. On submission your message is
        handed to {emailReady ? "your email app" : "a channel available to this build"}, so you can
        review it before sending.
      </p>

      <div className="mt-5 grid gap-4">
        <FieldShell id="enquiry-name" label="Name" error={errors.name}>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            required
          />
        </FieldShell>

        <FieldShell id="enquiry-email" label="Email address" error={errors.email}>
          <Input
            id="enquiry-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            required
          />
        </FieldShell>

        <FieldShell id="enquiry-subject" label="Subject" error={errors.subject}>
          <Input
            id="enquiry-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
            invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "enquiry-subject-error" : undefined}
            placeholder="e.g. Enquiry about the 2020 Toyota RAV4"
            required
          />
        </FieldShell>

        <FieldShell
          id="enquiry-message"
          label="Message"
          error={errors.message}
          hint="Include the vehicle reference if you have one, plus any questions about inspection or paperwork."
        >
          <Textarea
            id="enquiry-message"
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "enquiry-message-error" : "enquiry-message-hint"
            }
            required
          />
        </FieldShell>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          <Send aria-hidden="true" className="size-4" strokeWidth={1.9} />
          Prepare enquiry
        </Button>
        <p className="text-[11px] leading-relaxed text-ink-500">
          We never claim an enquiry was received unless a delivery service is connected.
        </p>
      </div>

      <div role="status" aria-live="polite" className="mt-4 empty:mt-0">
        {status === "invalid" ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] font-medium text-red-800">
            Please review the highlighted fields and try again.
          </p>
        ) : null}
        {status === "mailto" ? (
          <p className="rounded-md border border-moss-200 bg-moss-50 px-3 py-2.5 text-[12px] leading-relaxed text-moss-800">
            Your email app should now open with the enquiry prepared. Nothing has been sent yet —
            send the email from your app to reach the dealership.
          </p>
        ) : null}
        {status === "whatsapp" ? (
          <p className="rounded-md border border-moss-200 bg-moss-50 px-3 py-2.5 text-[12px] leading-relaxed text-moss-800">
            WhatsApp should now open in a new tab with your message prepared. Review it and press
            send there.
          </p>
        ) : null}
        {status === "unavailable" ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-[12px] leading-relaxed text-amber-900">
            Nothing has been sent. This demonstration build has no email address or WhatsApp number
            configured, so there is no delivery channel. Add{" "}
            <code className="font-mono text-[11px]">NEXT_PUBLIC_CONTACT_EMAIL</code> or{" "}
            <code className="font-mono text-[11px]">NEXT_PUBLIC_WHATSAPP_NUMBER</code> to enable
            delivery.
          </p>
        ) : null}
      </div>
    </form>
  );
}
