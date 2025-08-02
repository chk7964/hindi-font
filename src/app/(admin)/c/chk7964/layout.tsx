import type { Metadata } from "next";
import { type ReactNode } from "react";
import { type DynamicRouteSegmentConfig } from "@/types/api-response";
import AdminLayout from "@/components/layout/admin-layout";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
    },
  },
};

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
