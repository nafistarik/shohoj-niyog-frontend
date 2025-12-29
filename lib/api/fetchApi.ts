import { createBaseRequest } from "./baseRequest";

export interface ApiResponseBase {
  success: boolean;
  error: boolean;
  status: number;
  message: string;
}

export interface ApiResponse<T> extends ApiResponseBase {
  data: T | null;
}
export const fetchApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const { response, parsed } = await createBaseRequest(
      endpoint,
      method,
      body
    );

    const apiResponse = parsed as ApiResponse<T>;

    if (!response.ok) {
      return {
        success: false,
        error: true,
        status: response.status,
        message: apiResponse?.message || "Request failed",
        data: null,
      };
    }

    return {
      success: true,
      error: false,
      status: response.status,
      message: apiResponse?.message || "Success",
      data: apiResponse.data,
    };
  } catch {
    return {
      success: false,
      error: true,
      status: 500,
      message: "Unexpected error",
      data: null,
    };
  }
};
