"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Tag from "./tag";

type TagFiltersProps = {
  tags: string[]
};

function TagFilters({ tags }: TagFiltersProps) {
  const router = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedTags = searchParams.getAll("tags")

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    const isSelected = selectedTags.includes(tag)

    const nextTags = isSelected
      ? selectedTags.filter(
          (selectedTag) => selectedTag !== tag,
        )
      : [...selectedTags, tag];

    params.delete("tags");

    nextTags.forEach((selectedTag) => {
      params.append("tags", selectedTag);
    });

    // Filters changed, so return to page 1.
    params.delete("page");

    router.push(
      `${pathname}?${params.toString()}`
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        active={selectedTags.length === 0}
        onClick={() => {
          const params = new URLSearchParams(
            searchParams.toString(),
          );

          params.delete("tags");
          params.delete("page");

          router.push(
            `${pathname}?${params.toString()}`,
          );
        }}
      >
        All
      </Tag>

      {tags.map((tag) => (
        <Tag
          key={tag}
          active={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}

export default TagFilters
