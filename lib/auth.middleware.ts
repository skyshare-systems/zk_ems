import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export const authorize = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      const token = authHeader.split(" ")[1];

      const tokenData = await prisma.token.findFirst({
        where: {
          token,
        },
      });

      if (!tokenData) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode("zk_ems"),
      );

      const user = await prisma.user.findUnique({
        where: { id: payload.userId as string },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      (req as AuthenticatedRequest).user = user;

      return handler(req as AuthenticatedRequest);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error, error: (error as Error).message },
        { status: 401 },
      );
    }
  };
};
