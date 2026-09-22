import SignUpForm from "@/features/auth/components/sign-up-form";
import { cn } from "@/lib/utils/general/cn";
import Link from "next/link";

function SignupPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 font-mono text-xs text-emerald-400">
          $ devlog signup
        </p>

        <h1 className="font-mono text-3xl font-semibold tracking-tight text-zinc-100">
          Create an account
          <span className="text-emerald-400">_</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Join the community and start sharing
          what you&apos;re building.
        </p>
      </div>

      <SignUpForm />

      <div className="mt-8 border-t border-zinc-800 pt-6">
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className={cn(
              "font-medium text-emerald-400",
              "transition hover:text-emerald-300"
            )}
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
