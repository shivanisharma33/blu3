import { NextResponse } from "next/server";

/**
 * TODO(before launch): connect to BluEnergies' existing mailing-list provider.
 * The current site's newsletter endpoint was not discoverable from the public markup
 * (see docs/phase-1-audit.md §5). Until then this validates and logs only — it does NOT store subscribers.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body?.consent !== true) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  console.warn("[newsletter] provider not connected — signup not stored");
  return NextResponse.json({ ok: true, stub: true });
}
