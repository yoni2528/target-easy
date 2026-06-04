import { NextResponse } from "next/server";

// Telegram bot used to ping the team about new leads. Token is for the
// dumbledore bot (same one used by other matara projects).
const BOT_TOKEN = "8033422038:AAFqvFgMMZxM691cEPEwKr6dSwTDQ-YLgps";
const CHAT_ID = "-1003852892227"; // פיתוח group

function sanitize(s: unknown, max = 80): string {
  return String(s ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  let body: { name?: string; phone?: string } = {};
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

  const msg =
    `🛡 *ליד חדש — המגן המשפטי*\n` +
    `\n` +
    `👤 ${name}\n` +
    `📞 ${phone}\n` +
    `\n` +
    `_מקור: lawyer-hotline landing_`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    // Don't fail the customer if Telegram is down — log and continue
    console.error("telegram notify failed:", err);
  }

  return NextResponse.json({ ok: true });
}
