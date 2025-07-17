"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";

// Custom hooks and utilities
import { type Nav_itype } from "@/types/types";
import { env } from "@/config/env";

//Components

export default function PublicFooter() {
  const pathname = usePathname();

  const items: Nav_itype[] = [
    { name: "Home", url: `/` },
    { name: "About Us", url: `/about-us` },
    {
      name: "Contact Us",
      url: `/contact-us`,
    },
    {
      name: "Disclaimer",
      url: `/disclaimer`,
    },
    {
      name: "Privacy Policy",
      url: `/privacy-policy`,
    },
    { name: "Changelog", url: `/changelog` },
  ];

  return (
    <footer className="border-foreground/60 mt-2 border-t-2">
      <nav className="bg-primary/45 flex w-full flex-wrap items-center justify-center gap-2 p-4 text-center whitespace-nowrap">
        {items.map((item: Nav_itype, index: number) => (
          <Button
            key={index}
            variant={pathname === item.url ? "default" : "outline"}
            asChild
            // className={cn(
            //   pathname === item.url
            //     ? "hover:text-background"
            //     : "hover:text-foreground"
            // )}
          >
            <Link href={`${env.NEXT_PUBLIC_SITE_URL}${item.url}`}>
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>
      <section className="bg-primary text-foreground px-2 text-center">
        Copyright &copy; <b>{new Date().getFullYear()}</b>
        <Link href={"/"} className="text-background!">
          {" NickFinder.mobi "}
        </Link>
        All Rights Reserved
      </section>
    </footer>
  );
}
