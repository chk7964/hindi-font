"use client";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Custom hooks and utilities
import { signOutAction } from "./action";

//Components

export default function SignOut({ username }: { username: string }) {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="cursor-pointer">
            {username.at(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>User Name: {username}</DropdownMenuLabel>
        {session?.user &&
          Object.entries(session.user).map(([key, value]) =>
            key !== "image" && key !== "username" && key !== "id" ? ( // Exclude the image from the list
              <DropdownMenuLabel key={key}>
                <span className="capitalize">{key}:</span> {String(value)}
              </DropdownMenuLabel>
            ) : null
          )}
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={async () => {
            await signOutAction();
          }}
        >
          <LogOut /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
