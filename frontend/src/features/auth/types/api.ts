export type JsonApiResourceIdentifier = {
  id: string;
  type: string;
};

export type JsonApiRelationship = {
  data:
    | JsonApiResourceIdentifier
    | JsonApiResourceIdentifier[]
    | null;
};

export type JsonApiResource<T = Record<string, unknown>> = {
  id: string;
  type: string;
  attributes: T;
  relationships?: Record<string, JsonApiRelationship>;
};

export type JsonApiDocument<T = Record<string, unknown>, TMeta = undefined> = {
  data:
    | JsonApiResource<T>
    | JsonApiResource<T>[]
    | null;
  included?: JsonApiResource[];
  meta?: TMeta;
};

export type ApiResponse<T, TMeta = undefined> =
  | ApiSuccessResponse<T, TMeta>
  | ApiFailedResponse;

export type ApiSuccessResponse<T, TMeta = undefined> = {
  success: true;
  data: T;
  meta?: TMeta;
  errors: null;
};

export type ApiFailedResponse = {
  success: false;
  data: null;
  errors: ApiErrors;
};

export type AuthMeta = {
  auth: {
    accessToken: string;
    refreshToken: string;
  };
};

export type ApiError = {
  code: string;
  message: string;
};

export type ApiErrors = Record<string, ApiError[]>;

export type PaginationMeta = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  nextPage: number
  prevPage: number
}