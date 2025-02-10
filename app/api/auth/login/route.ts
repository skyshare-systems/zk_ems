import { generateToken, setAuthCookie } from "@/lib/auth";
import { AuthenticationError } from "@/lib/exceptions";
import prisma from "@/lib/prisma";
import { createApiResponse } from "@/lib/utils";
import { loginSchema } from "@/schema/login";
import { Prisma, User } from "@prisma/client";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { emailAddress: validatedData.username },
    });

    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    if (!user.isActivated) {
      throw new AuthenticationError("Account is deactivated");
    }

    const isPasswordValid = await compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid email or password");
    }

    const token = await generateToken(user.id);
    setAuthCookie(token);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const sanitizedUser: Omit<User, "password"> = {
      id: user.id,
      emailAddress: user.emailAddress,
      username: user.username,
      firstName: user.firstName,
      image: user.image,
      lastName: user.lastName,
      isActivated: user.isActivated,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    };

    return NextResponse.json(
      createApiResponse("Login successful. Redirecting...", sanitizedUser),
      { status: 200 }
    );
  } catch (error) {
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

    return NextResponse.json(createApiResponse("Internal server error", null), {
      status: 500,
    });
  }
}
