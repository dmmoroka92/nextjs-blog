import { cn } from "@/lib/utils";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Grid background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(to_right,rgba(63,63,70,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,63,70,0.16)_1px,transparent_1px)]",
          "bg-[size:32px_32px]"
        )}
      />

      {/* Soft center glow */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-emerald-500/5 blur-3xl
        "
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6">
        {/* Logo only — no navigation */}
        <header className="flex h-20 items-center">
          <Link
            href="/"
            className={cn(
              "font-mono text-lg font-semibold",
              "tracking-tight text-zinc-100",
              "transition hover:text-white"
            )}
          >
            &lt;devlog
            <span className="text-emerald-400">_</span>
            /&gt;
          </Link>
        </header>

        {/* Login / signup */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        <footer className="flex h-16 items-center justify-center">
          <p className="font-mono text-xs text-zinc-600">
            build. learn. share.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default AuthLayout;
