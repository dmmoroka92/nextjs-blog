"use client";

import { APP_ROUTES } from "@/constants/routes";
import { logoutUser } from "@/features/auth/actions/logout-user";
import { cn } from "@/lib/utils/general/cn";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (!result.success) {
      return;
    }

    if (result.meta) {
      toast.success(result.meta.message);
    }

    router.push(APP_ROUTES.auth.login);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2", 
          "text-sm text-zinc-400 transition-colors hover:bg-zinc-900",
          "hover:text-zinc-100"
        )
      }
    >
      <LogOut className="size-4" />
      Logout
    </button>
  );
}