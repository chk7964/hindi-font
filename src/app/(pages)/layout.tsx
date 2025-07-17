import { type Metadata } from "next";
import { type ReactNode } from "react";
import { type DynamicRouteSegmentConfig } from "@/types/api-response";
import PagesLayout from "@/components/layout/pages-layout";

export const metadata: Metadata = {
  title: {
    template: "%s | NickFinder.mobi",
    default: "NickFinder.mobi",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PagesLayout>{children}</PagesLayout>;
}

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
