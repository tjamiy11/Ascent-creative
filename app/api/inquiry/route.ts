import { NextResponse } from "next/server";
import { site } from "@/lib/site-config";

/**
 * Website lead → email to Stefan, sent through Resend (https://resend.com).
 *
 * Env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required
 *   INQUIRY_TO       optional, defaults to site.email
 *   INQUIRY_FROM     optional, defaults to Resend's shared sender. Once
 *                    ascentstudios.co is verified in Resend, set this to e.g.
 *                    "Ascent Studios Website <leads@ascentstudios.co>".
 *
 * Every subject starts with "[Website Lead]" so a Gmail filter can file it
 * under "Business/ASCENT STUDIO Website leads".
 */

const SUBJECT_TAG = "[Website Lead]";

const FIELDS = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["projectDate", "Project date"],
  ["location", "City & state"],
  ["lookingFor", "Looking for"],
  ["budget", "Budget"],
  ["referral", "How they heard about us"],
  ["message", "About the project"],
] as const;

type Key = (typeof FIELDS)[number][0];

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real visitors never see this field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    FIELDS.map(([key]) => [key, String(body[key] ?? "").trim().slice(0, 5000)])
  ) as Record<Key, string>;

  if (!data.name || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a few words about the project." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[inquiry] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: `Our form is offline — please email ${site.email} directly.` },
      { status: 500 }
    );
  }

  const rows = FIELDS.filter(([key]) => data[key]);
  const text = rows.map(([key, label]) => `${label}: ${data[key]}`).join("\n\n");
  const html = `<table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([key, label]) =>
        `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="white-space:pre-wrap">${escape(data[key])}</td></tr>`
    )
    .join("")}</table>`;

  const subject = [SUBJECT_TAG, data.name, data.lookingFor].filter(Boolean).join(" — ");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM || "Ascent Studios Website <onboarding@resend.dev>",
      to: [process.env.INQUIRY_TO || site.email],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: `Something went wrong — please email ${site.email} directly.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
