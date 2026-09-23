export type JsonApiResource<T> = {
  id: string;
  type: string;
  attributes: T;
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