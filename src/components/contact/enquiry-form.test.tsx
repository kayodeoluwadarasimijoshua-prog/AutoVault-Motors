// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/contact/enquiry-form";

beforeEach(() => {
  vi.unstubAllEnvs();
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("EnquiryForm validation", () => {
  it("blocks an empty submission and associates each error with its field", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.click(screen.getByRole("button", { name: /Prepare enquiry/i }));

    expect(screen.getByText(/Please review the highlighted fields/i)).toBeDefined();

    const name = screen.getByLabelText("Name");
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById("enquiry-name-error")).not.toBeNull();
    expect(name.getAttribute("aria-describedby")).toBe("enquiry-name-error");

    expect(screen.getByLabelText("Email address").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText("Subject").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText("Message").getAttribute("aria-invalid")).toBe("true");

    // Focus moves to the first invalid field.
    expect(document.activeElement?.id).toBe("enquiry-name");
  });

  it("rejects a malformed email address and a short message", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Okeke");
    await user.type(screen.getByLabelText("Email address"), "ada@");
    await user.type(screen.getByLabelText("Subject"), "Vehicle enquiry");
    await user.type(screen.getByLabelText("Message"), "Too short");
    await user.click(screen.getByRole("button", { name: /Prepare enquiry/i }));

    expect(screen.getByText(/format name@example.com/i)).toBeDefined();
    expect(screen.getByText(/at least 20 characters/i)).toBeDefined();
    expect(screen.queryByText(/Please review the highlighted fields/i)).toBeDefined();
  });

  it("clears a field error as soon as the visitor corrects it", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.click(screen.getByRole("button", { name: /Prepare enquiry/i }));
    expect(screen.getByText(/Enter your name/i)).toBeDefined();

    await user.type(screen.getByLabelText("Name"), "Ada");
    expect(screen.queryByText(/Enter your name/i)).toBeNull();
  });

  it("never reports a successful delivery when no channel is configured", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Okeke");
    await user.type(screen.getByLabelText("Email address"), "ada@example.com");
    await user.type(screen.getByLabelText("Subject"), "Enquiry about the Camry");
    await user.type(
      screen.getByLabelText("Message"),
      "Please share more photographs of the interior and the service record.",
    );
    await user.click(screen.getByRole("button", { name: /Prepare enquiry/i }));

    const status = screen.getByRole("status").textContent ?? "";
    expect(status).toMatch(/Nothing has been sent|email app|WhatsApp should now open/i);
    expect(status).not.toMatch(/received|thank you|success/i);
  });

  it("describes the form honestly as a demonstration", () => {
    render(<EnquiryForm />);
    expect(screen.getByText(/Demonstration form/i)).toBeDefined();
  });
});
