import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { AuthenticationError } from "./exceptions";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createErrorMessage = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(createApiResponse("Invalid input", null), {
      status: 400,
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      createApiResponse("Database is unreachable", null),
      { status: 500 }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      createApiResponse("Invalid input", { errors: error.errors }),
      { status: 400 }
    );
  }

  if (error instanceof AuthenticationError) {
    return NextResponse.json(createApiResponse(error.message, null), {
      status: 401,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(createApiResponse("Database error", null), {
      status: 500,
    });
  }

  return NextResponse.json(createApiResponse("Internal server error", error), {
    status: 500,
  });
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong";
};

export interface Meta {
  page: number;
  totalPage: number;
  remaining: number;
  hasNextPage?: boolean;
}

export const createApiResponse = <T>(message: string, data: T, meta?: Meta) => {
  return { message, data, meta };
};

export const createErrorResponse = (message: string) => {
  return { message };
};
