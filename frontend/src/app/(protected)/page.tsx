import { API_ROUTES } from "@/constants/routes";
import { User } from "@/features/auth/types/user";
import { apiFetch } from "@/lib/api/client";
import { DashboardHeader } from "../components/dashboard/dashboard-header";

export default async function Home() {
  const result = await apiFetch<User>(
    API_ROUTES.auth.me
  )
  return (
    <div>
      <DashboardHeader />
    </div>
  );
}
