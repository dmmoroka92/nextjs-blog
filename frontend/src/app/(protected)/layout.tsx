import { APP_ROUTES } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function ProtectedLayout({
  children,
}: { children: ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    redirect(APP_ROUTES.auth.login)
  }

  return (
    <main className="min-h-full flex flex-col">
      {children}
    </main>
  );
}

export default ProtectedLayout;