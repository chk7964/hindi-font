import { type DynamicRouteSegmentConfig } from "@/types/api-response";
import type { Metadata } from "next";
import { type ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
    },
  },
};

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
