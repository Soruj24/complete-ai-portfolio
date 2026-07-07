import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/types";

export function createApiResponse<T>(
  data: T,
  options?: {
    message?: string;
    status?: number;
    pagination?: ApiResponse["pagination"];
  }
): NextResponse<ApiResponse<T>> {
  const { message, status = 200, pagination } = options || {};
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      message,
      data,
      pagination,
    } as ApiResponse<T>,
    { status }
  );
}

export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
      error: { code: status.toString(), details },
    } as ApiResponse<null>,
    { status }
  );
}

export function handleApiError(error: unknown): NextResponse<ApiResponse<null>> {
  if (error instanceof Error) {
    return createErrorResponse(error.message, 500);
  }
  return createErrorResponse("An unexpected error occurred", 500);
}
