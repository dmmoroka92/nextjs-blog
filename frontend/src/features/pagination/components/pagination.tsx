"use client";

import { cn } from "@/lib/utils/general/cn";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { PaginationMeta } from "@/features/auth/types/api";
import { getVisiblePages } from "../utils/get-visible-pages";
import PaginationButton from "./pagination-button";

type PaginationProps = {
  pagination: PaginationMeta | undefined;
};

function Pagination({
  pagination,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const {
    currentPage,
    totalPages,
  } = pagination;

  function handlePageChange(page: number) {
    if (page === currentPage) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("page", String(page));

    router.push(
      `${pathname}?${params.toString()}`,
    );
  }

  const pages = getVisiblePages(
    currentPage,
    totalPages,
  );

  const previousPage =
    currentPage > 1
      ? currentPage - 1
      : null;

  const nextPage =
    currentPage < totalPages
      ? currentPage + 1
      : null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-2"
    >
      <PaginationButton
        onClick={() => {
          if (previousPage) {
            handlePageChange(previousPage);
          }
        }}
        disabled={!previousPage}
        ariaLabel="Previous page"
      >
        <ChevronLeft className="size-4" />
      </PaginationButton>

      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                "flex size-9 items-center justify-center",
                "text-sm text-zinc-500",
              )}
            >
              ...
            </span>
          );
        }

        return (
          <PaginationButton
            key={page}
            onClick={() =>
              handlePageChange(page)
            }
            active={page === currentPage}
            ariaLabel={`Page ${page}`}
          >
            {page}
          </PaginationButton>
        );
      })}

      <PaginationButton
        onClick={() => {
          if (nextPage) {
            handlePageChange(nextPage);
          }
        }}
        disabled={!nextPage}
        ariaLabel="Next page"
      >
        <ChevronRight className="size-4" />
      </PaginationButton>
    </nav>
  );
}

export default Pagination;
