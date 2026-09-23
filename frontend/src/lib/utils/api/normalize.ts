import { JsonApiResource } from "@/features/auth/types/api";

export function normalizeJsonApiResource<T>(
  resource: JsonApiResource<T>,
): T & { id: string } {
  console.log(
    "[normalizeJsonApiResource] resource:",
    resource
  )
  
  return {
    id: resource.id,
    ...resource.attributes,
  };
}

export function normalizeJsonApiCollection<T>(
  resources: JsonApiResource<T>[],
): Array<T & { id: string }> {
  return resources.map(normalizeJsonApiResource);
}