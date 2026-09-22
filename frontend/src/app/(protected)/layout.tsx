import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ProtectedLayout({
  children,
}: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <main className="min-h-full flex flex-col">
      {children}
    </main>
  );
}

export default ProtectedLayout;