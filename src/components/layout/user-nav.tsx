"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProfile {
  email: string;
  id: string;
  name: string;
  restaurant: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    subscription_plan: string;
    status: string;
    trial_ends_at: string;
  };
  restaurant_id: string;
  type: string;
}

export function UserNav(user: IProfile) {
  const status = "green"
  const statusColor = {
    green: "bg-green-400",
    red: "bg-red-400",
    yellow: "bg-yellow-400",
  }[status];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="/avatar.jpg" alt="@shadcn" />
            <AvatarFallback>{user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}</AvatarFallback>
          </Avatar>
          <span
            className={`-bottom-1 -right-[4px] absolute  w-3 h-3 ${statusColor} border-2 border-white dark:border-gray-800 rounded-full`}
          ></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/signin" legacyBehavior>
            <a className="flex justify-between w-full text-left">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </a>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}