import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "NewsToss | %s",
    default: "NewsToss",
  },
  description:
    "주식 투자에 설명력을 더해주는 AI 애널리스트. 과거 유사 사건 뉴스 및 증권사 리포트 기반 주식 투자 판단 보조 시스템",
  keywords: ["주식", "투자", "뉴스", "증권", "리포트"],
  // openGraph: {
  //   title: "NewsToss",
  //   description:
  //     "주식 투자에 설명력을 더해주는 AI 애널리스트. 과거 유사 사건 뉴스 및 증권사 리포트 기반 주식 투자 판단 보조 시스템",
  //   images: ["/og-image.png"],
  // },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
