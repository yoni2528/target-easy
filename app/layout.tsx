import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LangAttributes } from "@/components/LangAttributes";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
});

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
    <html lang="he" dir="rtl" className={heebo.className} suppressHydrationWarning>
      <body className={`${rubik.variable} antialiased noise-bg`}>
        <Providers>
          <LangAttributes />
          {children}
        </Providers>
      </body>
    </html>
  );
}
