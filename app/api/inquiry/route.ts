import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site-config";

// Node runtime (Resend uses the Node SDK, not edge).
export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  timeline?: unknown;
  budget?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + hard length cap so a single field can't be abused. */
function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const company = clean(body.company, 200);
  const projectType = clean(body.projectType, 100);
  const timeline = clean(body.timeline, 100);
  const budget = clean(body.budget, 100);
  const message = clean(body.message, 5000);

  // Validate the required fields at the boundary.
  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — the form surfaces a "email us directly" fallback.
    return NextResponse.json(
      { error: "Inquiry email is not configured yet." },
      { status: 503 }
    );
  }

  const to = process.env.INQUIRY_TO || site.email;
  const from =
    process.env.INQUIRY_FROM || "Ascent Studios <inquiries@ascentstudios.co>";
  const subject = `New project inquiry${company ? ` — ${company}` : ""}`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company / Brand", company],
    ["Project type", projectType],
    ["Timeline", timeline],
    ["Budget", budget],
  ].filter(([, v]) => v) as [string, string][];

  const html = `
    <h2 style="font-family:sans-serif">New project inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;opacity:.6">${k}</td><td style="padding:4px 0">${esc(
              v
            )}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${esc(
      message
    )}</p>
  `;

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      return NextResponse.json({ error: "Failed to send." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }
}
