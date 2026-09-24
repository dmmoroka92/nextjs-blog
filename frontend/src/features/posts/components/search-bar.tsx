import { cn } from "@/lib/utils/general/cn";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative">
      <Search
        className={cn(
          "absolute left-3 top-1/2 size-4",
          "-translate-y-1/2 text-zinc-500",
        )}
      />

      <input
        type="search"
        placeholder="Search posts..."
        className={cn(
          "h-10 w-full rounded-md border border-zinc-800",
          "bg-zinc-900/30 pl-10 pr-4",
          "text-sm text-zinc-100",
          "placeholder:text-zinc-500",
          "outline-none transition-colors",
          "focus:border-emerald-500",
        )}
      />
    </div>
  );
}

export default SearchBar
