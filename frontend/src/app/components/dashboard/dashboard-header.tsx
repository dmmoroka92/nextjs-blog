import { APP_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/general/cn";
import { Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Welcome back, John!
        </p>
      </div>

      <Link
        href={APP_ROUTES.posts.new}
        className={cn(
          "inline-flex items-center gap-2 rounded-md bg-emerald-300 px-4 py-2.5",
          "text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-200"
        )}
      >
        <Plus className="size-4" />
        New post
      </Link>
    </div>
  );
}
