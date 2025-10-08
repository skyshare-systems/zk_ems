import { Meta } from "@/lib/utils";

export type ApiResponse<T> = {
  message: string;
  data: T;
  meta?: Meta;
}

