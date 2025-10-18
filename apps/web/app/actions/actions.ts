"use server";

import { prisma } from "@repo/db";

export async function totalUsers() {
  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    console.error("❌ Error fetching total users:", error);
    throw new Error("Failed to fetch user count");
  }
}
