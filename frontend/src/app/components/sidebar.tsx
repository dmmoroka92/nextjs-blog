"use client";

import Link from "next/link";
import {
  Bookmark,
  FileText,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils/general/cn";
import { LogoutButton } from "./logout-button";
import { APP_ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: APP_ROUTES.posts.index,
    icon: FileText,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const path = usePathname()

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center border-b border-zinc-800 px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-emerald-400"
        >
          DevLog
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navigation.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2",
              "text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100",
              href === path && "text-zinc-100 bg-zinc-900"
            )}
          >
            <Icon className="size-4" />

            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
