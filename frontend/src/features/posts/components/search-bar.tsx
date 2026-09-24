"use client"

import { cn } from "@/lib/utils/general/cn";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEBOUNCE_MS = 400

function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get("search") ?? ""

  const [value, setValue] = useState<string>(currentSearch)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (value.trim()) {
        params.set("search", value.trim())
      } else {
        params.delete("search")
      }

      params.delete("page")

      router.replace(`${pathname}?${params.toString()}`)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [
    value,
    router,
    pathname,
    searchParams
  ])

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
        value={value}
        placeholder="Search posts..."
        onChange={(event) => setValue(event.target.value)}
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
