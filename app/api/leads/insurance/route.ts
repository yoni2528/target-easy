import { NextResponse } from "next/server";

// Telegram bot used to ping the team about new leads (dumbledore bot).
const BOT_TOKEN = "8033422038:AAFqvFgMMZxM691cEPEwKr6dSwTDQ-YLgps";
const CHAT_ID = "-1003852892227"; // פיתוח group

// n8n production webhook that mirrors every lead into the Excel sheet.
const N8N_WEBHOOK =
  "https://server.babyexpress.online/webhook/97ffb558-d0f9-4467-913c-86c35074e18e";

function sanitize(s: unknown, max = 80): string {
  return String(s ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  let body: {
    name?: string;
    phone?: string;
    agreeContact?: boolean;
    wantOtherInsurance?: boolean;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const name = sanitize(body.name);
  const phone = sanitize(body.phone, 30);
  if (!name || !phone) {
    return NextResponse.json({ error: "שדות חסרים" }, { status: 400 });
  }
  if (!/^[0-9+\-\s()]{7,}$/.test(phone)) {
    return NextResponse.json({ error: "מספר טלפון לא תקין" }, { status: 400 });
  }
  if (!body.agreeContact) {
    return NextResponse.json(
      { error: "יש לאשר יצירת קשר" },
      { status: 400 }
    );
  }

  const wantOtherInsurance = Boolean(body.wantOtherInsurance);
  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";
  const submittedAt = new Date().toISOString();

  // ── Notify Telegram + n8n in parallel; both are best-effort. ──
  const telegramText =
    `🛡 *ליד חדש — ביטוח מנורה*\n` +
    `\n` +
    `👤 ${name}\n` +
    `📞 ${phone}\n` +
    `\n` +
    `✅ אישר יצירת קשר\n` +
    (wantOtherInsurance
      ? `💰 מעוניין בהוזלת ביטוחים נוספים\n`
      : `➖ לא מעוניין בהוזלת ביטוחים נוספים\n`) +
    `\n` +
    `_מקור: insurance landing_`;

  const telegramPromise = fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramText,
        parse_mode: "Markdown",
      }),
    }
  ).catch((err) => {
    console.error("telegram notify failed:", err);
  });

  const n8nPromise = fetch(N8N_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      product: "ביטוח מנורה",
      source: "insurance",
      agree_contact: true,
      want_other_insurance: wantOtherInsurance,
      submitted_at: submittedAt,
      user_agent: userAgent.slice(0, 500),
      referer: referer.slice(0, 500),
      page_url: referer.slice(0, 500),
    }),
  }).catch((err) => {
    console.error("n8n webhook failed:", err);
  });

  await Promise.allSettled([telegramPromise, n8nPromise]);

  return NextResponse.json({ ok: true });
}
