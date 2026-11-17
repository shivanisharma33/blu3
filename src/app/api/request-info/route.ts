import { NextResponse } from "next/server";

/**
 * TODO(before launch): connect to the delivery used by the current site's form
 * (it posts to index.php with Google reCAPTCHA v3; destination mailbox not public).
 * Until then this validates only — it does NOT send or store anything.
 */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const name = typeof b?.full_name === "string" ? b.full_name.trim() : "";
  const email = typeof b?.email === "string" ? b.email.trim() : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  console.warn("[request-info] handler not connected — request not delivered");
  return NextResponse.json({ ok: true, stub: true });
}
