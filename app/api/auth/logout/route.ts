import prisma from "@/lib/prisma";
import { createApiResponse, createErrorMessage } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  token: string;
  userId: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const { token, userId } = (await request.json()) as Payload;

    if (!token || !userId) {
      return NextResponse.json(createApiResponse("Invalid Token", null), {
        status: HttpStatusCode.BadRequest,
      });
    }

    const tokenData = await prisma.token.findFirst({
      where: {
        token: token,
      },
    });

    if (!tokenData) {
      return NextResponse.json(createApiResponse("Invalid Token", null), {
        status: HttpStatusCode.BadRequest,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(createApiResponse("User not found", null), {
        status: HttpStatusCode.NotFound,
      });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode("zk_ems"),
    );

    if ((payload.userId as string) !== userId) {
      return NextResponse.json(createApiResponse("Invalid Token", null), {
        status: HttpStatusCode.BadRequest,
      });
    }

    await prisma.token.delete({
      where: {
        token: token,
      },
    });

    return NextResponse.json(
      createApiResponse("Successfully logged out", null),
      {
        status: HttpStatusCode.Ok,
      },
    );
  } catch (error) {
    return NextResponse.json(createErrorMessage(error), { status: 500 });
  }
};
