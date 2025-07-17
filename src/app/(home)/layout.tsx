import { type DynamicRouteSegmentConfig } from "@/types/api-response";
import { type ReactNode } from "react";
import HomeLayout from "@/components/layout/home-layout";

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <HomeLayout>{children}</HomeLayout>;
}

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
// export const revalidate = 3600; //
