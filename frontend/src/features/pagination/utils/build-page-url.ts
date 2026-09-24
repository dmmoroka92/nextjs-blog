export function buildPageUrl(
  basePath: string,
  page: number,
) {
  return `${basePath}?page=${page}`;
}
