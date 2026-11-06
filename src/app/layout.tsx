import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const hind = Hind_Siliguri({
  variable: "--font-hind-mono",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en | bn" suppressHydrationWarning className={`${hind.variable} font-hind h-full antialiased`}>
      <body suppressHydrationWarning className={` min-h-full flex flex-col `}>
        <main>
          {children}
        </main>
        <Toaster></Toaster>
      </body>
    </html>
  );
}