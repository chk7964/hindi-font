import RootLayout from "@/components/layout/root-layout";
import "@/styles/globals-tailwind.css";
import { type Metadata, type Viewport } from "next";
import { type ReactNode } from "react";
import { Hanuman } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | NickFinder.mobi",
    default: "NickFinder.mobi",
  },
  other: {
    "apple-mobile-web-app-title": "MyWebSitefg",
  },
};

export const hanuman = Hanuman({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar scrollbar-track-muted scrollbar-thumb-primary antialiased"
      suppressHydrationWarning
    >
      <body className={`${hanuman.className} bg-muted/0 h-screen`}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
