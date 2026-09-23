import { cn } from "@/lib/utils/general/cn";

function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
      <div className="text-sm text-zinc-500">
        Dashboard
      </div>

      <button
        type="button"
        className={cn(
          "flex size-9 items-center justify-center",
          "rounded-full bg-zinc-800 text-sm font-medium text-zinc-200"
        )}
      >
        JS
      </button>
    </header>
  );
}

export default TopBar