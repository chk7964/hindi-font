"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// UI Components
import { Button } from "@/components/ui/button";

// Custom hooks and utilities

import type { Nav_itype } from "@/types/types";

//Components
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "@/config/env";
// import SignOut from "./SignOut";

export default function Navbar({
  items,
  // username,
}: {
  items: Nav_itype[];
  // username: string;
}) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item: Nav_itype, index: number) => (
        <Button
          key={index}
          variant={pathname === item.url ? "destructive" : "outline"}
          asChild
        >
          <Link href={`${env.NEXT_PUBLIC_SITE_URL}${item.url}`}>
            {item.name}
          </Link>
        </Button>
      ))}
      {/* <SignOut username={username} />  */}
      <ThemeToggle />
    </>
  );
}
