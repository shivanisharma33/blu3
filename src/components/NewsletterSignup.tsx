"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/content/site";

/**
 * Newsletter signup — preserves the original flow (email + CASL express consent).
 * The original consent modal is replaced by an inline required checkbox with the same wording.
 */
export default function NewsletterSignup() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg("Please input a valid email address.");
      return;
    }
    if (!data.get("consent")) {
      setState("error");
      setMsg("Please confirm your consent to receive communications.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(data.get("name") || ""), email, consent: true }) });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setState("ok");
      setMsg(json.stub ? "Preview build: the mailing-list provider is not connected yet, so this signup was not stored." : "Thank you — you’re subscribed to BluEnergies updates.");
      form.reset();
    } catch {
      setState("error");
      setMsg("Something went wrong. Please try again or email " + CONTACT.email + ".");
    }
  }

  return (
    <form className="signup" onSubmit={onSubmit} noValidate>
      <div className="signup__row" style={{ marginBottom: ".5rem" }}>
        <label htmlFor="nl-name" className="sr-only">Name (optional)</label>
        <input id="nl-name" name="name" type="text" autoComplete="name" placeholder="Name (optional)" />
      </div>
      <div className="signup__row">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" name="email" type="email" autoComplete="email" placeholder="Email address" required aria-describedby="nl-msg" />
        <button className="signup__submit" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Subscribe →"}
        </button>
      </div>
      <label className="signup__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to and consent to receive news, updates, and other communications by way of commercial electronic
          messages (including email) from BluEnergies Ltd. I understand I may withdraw consent at any time by clicking
          the unsubscribe link contained in all emails from BluEnergies Ltd. Contact: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </span>
      </label>
      <p id="nl-msg" className="signup__msg" data-state={state} role="status" aria-live="polite">{msg}</p>
    </form>
  );
}
