import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Target-Easy | מצא מדריך ירי",
  description: "הפלטפורמה המובילה למציאת מדריכי ירי ומטווחים בישראל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
