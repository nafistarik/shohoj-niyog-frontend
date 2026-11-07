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
/** Pulls the backend's `error` text out of an error response, if it sent one. */
const getErrorMessage = (parsed: unknown): string | undefined =>
  typeof parsed === "object" &&
  parsed !== null &&
  "error" in parsed &&
  typeof parsed.error === "string"
    ? parsed.error
    : undefined;

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

    if (!response.ok) {
      return {
        success: false,
        error: true,
        status: response.status,
        message: getErrorMessage(parsed) || "Request failed",
        data: null,
      };
    }

    // If backend returns raw LoginResponse instead of ApiResponse<LoginResponse>
    const data: T | null = (parsed as T) ?? null;

    return {
      success: true,
      error: false,
      status: response.status,
      message: "Success",
      data,
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
