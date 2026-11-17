"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/content/site";

/** Same options and fields as the original /contact/request-for-information/ form. */
const ROLES = ["Potential Investor", "Analyst", "Shareholder", "Journalist", "Broker", "Investment Advisor", "Industry Professional"];

type Errors = Partial<Record<"full_name" | "email", string>>;

export default function RequestForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const errs: Errors = {};
    if (!String(d.get("full_name") || "").trim()) errs.full_name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("email") || ""))) errs.email = "Please enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      (form.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/request-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(d.entries())),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setState("ok");
      setMsg(json.stub
        ? "Preview build: the form handler is not connected yet, so this request was not sent. Please email " + CONTACT.email + "."
        : "Thank you — your request has been received.");
      if (!json.stub) form.reset();
    } catch {
      setState("error");
      setMsg("Something went wrong. Please try again or email " + CONTACT.email + ".");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="chips field--full">
        <legend>I am a:</legend>
        {ROLES.map((r, i) => (
          <label key={r}>
            <input type="radio" name="iama" value={r} defaultChecked={i === 0} />
            <span>{r}</span>
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor="rfi-name">Full Name *</label>
        <input id="rfi-name" name="full_name" type="text" autoComplete="name" required aria-invalid={!!errors.full_name} aria-describedby="rfi-name-err" />
        <span id="rfi-name-err" className="field__err">{errors.full_name}</span>
      </div>
      <div className="field">
        <label htmlFor="rfi-email">Email *</label>
        <input id="rfi-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby="rfi-email-err" />
        <span id="rfi-email-err" className="field__err">{errors.email}</span>
      </div>
      <div className="field field--full">
        <label htmlFor="rfi-comments">Comments</label>
        <textarea id="rfi-comments" name="comments" rows={5} />
      </div>

      <div className="field field--full" style={{ gap: "1rem" }}>
        <label className="check">
          <input type="checkbox" name="email_list" value="Email List" />
          <span>Sign me up for Email List</span>
        </label>
        <p className="check" style={{ paddingLeft: "calc(16px + .8rem)" }}>
          <span>
            I agree to and consent to receive news, updates, and other communications by way of commercial electronic
            messages (including email) from BluEnergies Ltd. I understand I may withdraw consent at any time by clicking the
            unsubscribe link contained in all emails from BluEnergies Ltd. <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </span>
        </p>
      </div>

      <button className="form__submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Submit"} <span aria-hidden="true">→</span>
      </button>
      <p className="form__status" data-state={state} role="status" aria-live="polite">{msg}</p>
    </form>
  );
}
