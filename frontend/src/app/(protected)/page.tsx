import { API_ROUTES } from "@/constants/routes";
import { User } from "@/features/auth/types/user";
import { apiFetch } from "@/lib/api/client";

export default async function Home() {
  const result = await apiFetch<User>(
    API_ROUTES.me
  )
  return (
    <div>
      <p>NextJS blog</p>

      {result.success && (
        <p>Logged in as {result.data.email}</p>
      )}
    </div>
  );
}
