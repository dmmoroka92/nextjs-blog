import {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "@/features/auth/types/api";

type NormalizedResource = Record<string, unknown>;

type IncludedMap = Map<string, JsonApiResource>;

type VisitedResources = Set<string>;

function resourceKey(
  resource: JsonApiResourceIdentifier,
): string {
  return `${resource.type}:${resource.id}`;
}

function buildIncludedMap(
  included: JsonApiResource[] = [],
): IncludedMap {
  return new Map(
    included.map((resource) => [
      resourceKey(resource),
      resource,
    ]),
  );
}

function normalizeRelationship(
  data: JsonApiRelationship["data"],
  includedMap: IncludedMap,
  visited: VisitedResources,
): unknown {
  if (data === null) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.map((identifier) =>
      normalizeIdentifier(
        identifier,
        includedMap,
        visited,
      ),
    );
  }

  return normalizeIdentifier(
    data,
    includedMap,
    visited,
  );
}

function normalizeIdentifier(
  identifier: JsonApiResourceIdentifier,
  includedMap: IncludedMap,
  visited: VisitedResources,
): NormalizedResource {
  const key = resourceKey(identifier);

  if (visited.has(key)) {
    return {
      id: identifier.id,
    };
  }

  const includedResource =
    includedMap.get(key);

  if (!includedResource) {
    return {
      id: identifier.id,
    };
  }

  return normalizeJsonApiResource(
    includedResource,
    includedMap,
    visited,
  );
}

function normalizeJsonApiResource(
  resource: JsonApiResource,
  includedMap: IncludedMap,
  visited: VisitedResources = new Set(),
): NormalizedResource {
  const key = resourceKey(resource);

  const normalized: NormalizedResource = {
    id: resource.id,
    ...resource.attributes,
  };

  if (!resource.relationships) {
    return normalized;
  }

  const nextVisited = new Set(visited);

  nextVisited.add(key);

  for (const [name, relationship] of Object.entries(
    resource.relationships,
  )) {
    normalized[name] = normalizeRelationship(
      relationship.data,
      includedMap,
      nextVisited,
    );
  }

  return normalized;
}

export function normalizeJsonApi(
  data:
    | JsonApiResource
    | JsonApiResource[]
    | null,
  included: JsonApiResource[] = [],
):
  | NormalizedResource
  | NormalizedResource[]
  | null {
  if (data === null) {
    return null;
  }

  const includedMap =
    buildIncludedMap(included);

  if (Array.isArray(data)) {
    return data.map((resource) =>
      normalizeJsonApiResource(
        resource,
        includedMap,
      ),
    );
  }

  return normalizeJsonApiResource(
    data,
    includedMap,
  );
}