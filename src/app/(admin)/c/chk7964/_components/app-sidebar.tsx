"use client";
import {
  Home,
  Settings,
  FileText,
  GalleryVerticalEnd,
  Info,
} from "lucide-react";
import { List, Star, RefreshCcw, Key } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "@/app/(home)/_components/header-nav/logo";
// import { version } from "../../../../../../package.json";
// Navigation data
const items = [
  {
    name: "Home",
    url: "/c/chk7964",
    icon: Home,
    title: "Go to Dashboard",
  },
  {
    name: "Names",
    url: "/c/chk7964/name",
    icon: List,
    title: "View Names",
  },
  {
    name: "Stylish Name",
    url: "/c/chk7964/stylish-name",
    icon: Star,
    title: "Explore Stylish Names",
  },
  {
    name: "Name Article",
    url: "/c/chk7964/name-article",
    icon: FileText,
    title: "View Name Article",
  },
  {
    name: "Revalidate",
    url: "/c/chk7964/revalidate",
    icon: RefreshCcw,
    title: "Revalidate Data",
  },
  {
    name: "Setting",
    url: "/c/chk7964/site-settings",
    icon: Settings,
    title: "Open Settings",
  },
  {
    name: "Key Values",
    url: "/c/chk7964/key-values",
    icon: Key,
    title: "Manage Key Values",
  },
  {
    name: "Info",
    url: "/c/chk7964/info",
    icon: Info,
    title: "See site info",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu className="ml-0! list-none!">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">
                      <Logo />
                    </span>
                    {/* <span className="text-xs opacity-80">v-{version}</span> */}
                  </div>
                </>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="ml-0! list-none!">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url ? true : false}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )} */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
