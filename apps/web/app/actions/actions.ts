"use server";

import { prisma } from "@repo/db";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

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


export async function trackVisit(headers: Headers | ReadonlyHeaders) {
  try {
    const ip = headers.get("x-forwarded-for") || "unknown";
    const ua = headers.get("user-agent") || "unknown";

    await prisma.visit.create({
      data: { ip, userAgent: ua },
    });

    const total = await prisma.visit.count();
    return total;
  } catch (err) {
    console.error("❌ Error tracking visit:", err);
    return 0;
  }
}

export async function getVisit() {
  try {
    const total = await prisma.visit.count();
    return total;
  } catch (err) {
    console.error("❌ Error", err);
    return 0;
  }
}