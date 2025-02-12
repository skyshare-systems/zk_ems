
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET ?? "zk_ems";
const JWT_EXPIRES_IN = "24h";

export async function generateToken(userId: string): Promise<string> {
/*   if (!userId) {
    throw new Error("User ID is required to generate a token");
  } */

    

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRES_IN)
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET));
  
  return token;
}

/* export async function setAuthCookie(token: string) {
  (await cookies()).set("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
} */