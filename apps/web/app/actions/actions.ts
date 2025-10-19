"use server";

import { prisma } from "@repo/db";

let catchCount: number | null = null;
let lastFetched: number = 0;
const CACHE_TTL = 60 * 1000;

export async function totalUsers() {
  try {
    const now = Date.now();
    if (catchCount !== null && now - lastFetched < CACHE_TTL) {
      console.log("fetch from catch!");
      return catchCount;
    }
    const count = await prisma.user.count();
    catchCount = count;
    lastFetched = now;
    return count;
  } catch (error) {
    console.error("❌ Error fetching total users:", error);
    throw new Error("Failed to fetch user count");
  }
}
