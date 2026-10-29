import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Texas Heart & Valve Specialists",
    template: "%s | Texas Heart",
  },
  description:
    "Combining compassion with technology, Texas Heart & Valve Specialists are here for all of your cardiac needs in Conroe, The Woodlands, Willis, and Spring, Texas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
