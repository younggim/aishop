import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Device Mall — AI 디바이스 전문 쇼핑몰",
  description: "스마트홈, 웨어러블, 로봇, 헬스케어, 보안, 오피스, 뷰티디바이스까지 AI 기기 전문 쇼핑몰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <Providers>
          <Header />
          <CategoryNav />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
