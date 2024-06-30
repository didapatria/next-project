import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  const { email, name } = await request.json();
  const newUser = await prisma.user.create({
    data: { email, name },
  });
  return NextResponse.json(newUser);
};
