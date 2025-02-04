import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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