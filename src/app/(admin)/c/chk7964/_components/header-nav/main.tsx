import { auth } from "@/auth";
import Link from "next/link";

// UI Components

// Custom hooks and utilities
import { type Nav_itype } from "@/types/types";

//Components
import LeftNavbar from "./left-navbar";
import Logo from "@/app/(home)/_components/header-nav/logo";
import Navbar from "./navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import SignOut from "./sign-out";

export default async function PrivateNavbar() {
  const session = await auth();
  const username = session?.user.username ?? "";

  const items: Nav_itype[] = [
    { name: "Home", url: "/c/chk7964" },
    { name: "Names", url: "/c/chk7964/name" },
    { name: "Stylish Name", url: "/c/chk7964/stylish-name" },
    { name: "Posts", url: "/c/chk7964/posts" },
    { name: "Revalidate", url: "/c/chk7964/revalidate" },
    { name: "Setting", url: "/c/chk7964/site-settings" },
    { name: "key values", url: "/c/chk7964/key-values" },
  ];

  return (
    <>
      <header className="bg-primary/80 flex w-full flex-wrap border-b py-1">
        <nav className="flex w-full items-center gap-2 px-4">
          <div className="flex basis-[95%] items-center">
            <Link href={"/"}>
              <Logo className="text-foreground" />
            </Link>
          </div>
          <div className="hidden md:m-2 md:flex md:flex-nowrap md:items-center md:justify-center md:gap-2 md:whitespace-nowrap">
            <Navbar items={items} />
            <SignOut username={username} />
          </div>
          <div className="flex gap-2 md:hidden">
            <ThemeToggle />
            <LeftNavbar items={items} />
          </div>
        </nav>
      </header>
    </>
  );
}
