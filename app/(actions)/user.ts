import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/db";

export async function getUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  return user;
}
