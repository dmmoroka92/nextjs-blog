import { cn } from "@/lib/utils/general/cn";

type PaginationButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  onClick: () => void;
};

function PaginationButton({
  children,
  active = false,
  disabled = false,
  ariaLabel,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-9 items-center justify-center",
        "rounded-md border text-sm font-medium",
        "transition-colors",
        active
          ? [
              "border-emerald-300",
              "bg-emerald-300",
              "text-zinc-950",
            ]
          : [
              "border-zinc-800",
              "bg-zinc-900",
              "text-zinc-300",
              "hover:border-zinc-700",
              "hover:bg-zinc-800",
              "hover:text-zinc-100",
            ],
        disabled && [
          "cursor-not-allowed",
          "opacity-40",
        ],
      )}
    >
      {children}
    </button>
  );
}

export default PaginationButton
