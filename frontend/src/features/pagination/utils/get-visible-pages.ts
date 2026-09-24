export type PageItem = number | "ellipsis";
const VISIBLE_PAGES = 5;

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages <= VISIBLE_PAGES) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  let startPage = Math.max(
    1,
    currentPage - Math.floor(VISIBLE_PAGES / 2),
  );

  let endPage = startPage + VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - VISIBLE_PAGES + 1;
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const pages: PageItem[] = [];

  if (startPage > 1) {
    pages.push(1);

    if (startPage > 2) {
      pages.push("ellipsis");
    }
  }

  pages.push(...visiblePages);

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
  }

  return pages;
}
