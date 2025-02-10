import api from "../axios";
import { getErrorMessage } from "../utils";
import { Recipient } from "jose";
import { Prisma, Template } from "@prisma/client";
import { ApiResponse } from "@/types/http";
import { GetCountResult } from "@prisma/client/runtime/library";
import { SentEmailWithTemplateAndCount } from "@/components/sent-email";

interface Params {
  params: string;
};





export const getSentEmails = async ({params}:Params) => {

  try {
    const response = await api.get<
    ApiResponse<SentEmailWithTemplateAndCount[]>>('/sent-emails?' + params);
    
    return response.data
  } catch (error) {
    throw getErrorMessage(error)
  }
}