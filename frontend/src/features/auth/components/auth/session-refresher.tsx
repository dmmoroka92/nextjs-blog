"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, APP_ROUTES } from "@/constants/routes";

export function SessionRefresher() {
  const router = useRouter();

  useEffect(() => {
    async function refresh() {
      const response = await fetch(
        `${process.env.API_HOST}${API_ROUTES.auth.refresh}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        router.refresh();
        return;
      }

      router.replace(APP_ROUTES.auth.login);
    }

    refresh();
  }, [router]);

  return null;
}
