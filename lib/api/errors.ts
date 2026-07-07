import { NextResponse } from "next/server";

export enum ErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  AI_GENERATION_FAILED = "AI_GENERATION_FAILED",
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly statusCode: number = 400,
    public readonly details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorResponse(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: { code: error.code, message: error.message, details: error.details },
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: { code: ErrorCode.INTERNAL_ERROR, message: "An unexpected error occurred" } },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { error: { code: ErrorCode.INTERNAL_ERROR, message: "An unexpected error occurred" } },
    { status: 500 },
  );
}
