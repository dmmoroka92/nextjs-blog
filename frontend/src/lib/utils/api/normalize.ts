import {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "@/features/auth/types/api";

type NormalizedResource = Record<string, unknown>;

type IncludedMap = Map<string, JsonApiResource>;

function resourceKey(
  resource: JsonApiResourceIdentifier,
) {
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
): unknown {
  if (data === null) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.map((resource) =>
      normalizeIdentifier(resource, includedMap),
    );
  }

  return normalizeIdentifier(data, includedMap);
}

function normalizeIdentifier(
  identifier: JsonApiResourceIdentifier,
  includedMap: IncludedMap,
): NormalizedResource {
  const includedResource = includedMap.get(
    resourceKey(identifier),
  );

  if (!includedResource) {
    return {
      id: identifier.id,
    };
  }

  return normalizeJsonApiResource(
    includedResource,
    includedMap,
  );
}

function normalizeJsonApiResource(
  resource: JsonApiResource,
  includedMap: IncludedMap,
): NormalizedResource {
  const normalized: NormalizedResource = {
    id: resource.id,
    ...resource.attributes,
  };

  if (!resource.relationships) {
    return normalized;
  }

  for (const [name, relationship] of Object.entries(
    resource.relationships,
  )) {
    normalized[name] = normalizeRelationship(
      relationship.data,
      includedMap,
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
) {
  if (data === null) {
    return null;
  }

  const includedMap = buildIncludedMap(included);

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