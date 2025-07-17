import React, { type ReactNode } from "react";
import Navbar from "@/app/(home)/_components/header-nav/main";
import Footer from "@/app/(home)/_components/footer-nav/main";
import { ScrollToTop } from "@/components/scroll-to-top";
import { GoogleTagManager } from "@next/third-parties/google";
import { env } from "@/config/env";

export default function PagesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="custom-prose">
      {env.GTM_TAG && <GoogleTagManager gtmId={env.GTM_TAG} />}
      <Navbar />
      <main className="container mx-auto my-2 min-h-screen">{children}</main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
