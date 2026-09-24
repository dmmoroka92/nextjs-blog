import { cn } from "@/lib/utils/general/cn";

type TagProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void
};

function Tag({
  children,
  active = false,
  onClick
}: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-1",
        "text-xs font-medium transition-colors",
        active
          ? [
              "border-emerald-300",
              "bg-emerald-300",
              "text-zinc-950",
            ]
          : [
              "border-zinc-800",
              "bg-zinc-900",
              "text-zinc-400",
              "hover:border-zinc-700",
              "hover:text-zinc-200",
            ],
      )}
    >
      {children}
    </button>
  );
}

export default Tag
