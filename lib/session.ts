import { NextRequest, NextResponse } from "next/server";

export const withSession = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    try {
      console.log("WITH SESSION")
      return await handler(req);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  };
};
