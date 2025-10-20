import { User } from "@prisma/client";
import prisma from "../prisma/client";

/**
 * Sync Supabase user with Prisma User model
 * Creates new user record or updates existing one
 */
export async function syncUserToDatabase(user: User) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: "READER",
          avatar_url: user.avatar_url ? user.avatar_url : "",
          updated_at: new Date(),
        },
      });
    } else {
      // update lat login and metadata
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          updated_at: new Date(),
          avatar_url: user.avatar_url ? user.avatar_url : "",
          name: user.name,
        },
      });
    }
  } catch (error) {
    console.log("Failed to sync user to database", error);
    throw new Error("Failed to create user account");
  }
}
