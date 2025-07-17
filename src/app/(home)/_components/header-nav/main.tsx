"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";

// Custom hooks and utilities
import { type Nav_itype } from "@/types/types";

//Components
import LeftNavbar from "./left-navbar";
import RightNavbar from "./right-navbar";
import Logo from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
export default function PublicNavbar() {
  const pathname = usePathname();

  const items = [
    { name: "Home", url: "/" },
    // { name: "Symbol", url: "/symbol" },
    { name: "Fancy Text Generator", url: "/text-tools/font-generator" },
    { name: "Text Decorator", url: "/text-tools/text-decorator" },
  ];

  return (
    <>
      <header className="bg-primary/70 not-prose shadow-foreground flex w-full flex-wrap overflow-x-auto border-b py-2 shadow-xs">
        <section className="flex w-full items-center px-4">
          <section className="md:hidden">
            <LeftNavbar items={items} />
          </section>

          <section className="flex basis-[95%] items-center justify-center md:justify-start">
            <Link href={"/"}>
              <Logo className="text-foreground" />
            </Link>
          </section>

          <section className="md:hidden">
            <RightNavbar />
          </section>

          <nav className="hidden md:m-2 md:flex md:h-6 md:flex-nowrap md:items-center md:justify-center md:gap-2 md:whitespace-nowrap">
            {items.map((item: Nav_itype, index: number) => (
              <Button
                key={index}
                variant={pathname === item.url ? "destructive" : "outline"}
                asChild
                className="cursor-pointer"
                // className={cn(
                //   pathname === item.url
                //     ? "hover:text-background"
                //     : "hover:text-foreground"
                // )}
              >
                <Link href={`${item.url}`}>{item.name}</Link>
              </Button>
            ))}
            <RightNavbar />
            <ThemeToggle />
          </nav>
        </section>
      </header>
    </>
  );
}
