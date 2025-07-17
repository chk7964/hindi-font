import React, { type ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
// import NextAuthProvider from "@/context/auth-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/context/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="">
      {/* <NextAuthProvider> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster
          closeButton={true}
          richColors
          position="top-right"
          duration={2000}
          offset={20}
          gap={2}
        />
        <NextTopLoader
          color="var(--foreground)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          speed={900}
        />
        <NuqsAdapter>{children}</NuqsAdapter>
        <ScrollToTop />
      </ThemeProvider>
      {/* </NextAuthProvider> */}
    </div>
  );
}
