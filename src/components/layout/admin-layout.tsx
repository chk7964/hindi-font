import { type ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/c/chk7964/_components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import SignOut from "@/app/(admin)/c/chk7964/_components/header-nav/sign-out";
import { auth } from "@/auth";
import { ThemeToggle } from "../theme-toggle";
import Logo from "@/app/(home)/_components/header-nav/logo";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  const username = session?.user.username ?? "";
  return (
    <div className="w-full max-w-none">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar collapsible="icon" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <Logo />
            <div className="flex gap-1.5">
              <ThemeToggle />
              <SignOut username={username} />
            </div>
          </header>
          <main className="custom-prose-admin my-2 min-h-screen flex-1 p-4">
            {children}
          </main>
          {/* <footer className="text-muted-foreground border-t p-4 text-center text-sm">
            <p>© 2025 AppName. All rights reserved.</p>
          </footer> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
