"use server";

import { prisma } from "@repo/db";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

let cachedUserCount: number | null = null;
let cachedVisitCount: number | null = null;
let lastFetchedUserCount = 0;
let lastFetchedVisits = 0;

const CACHE_TTL = 60 * 1000;

export async function totalUsers() {
  try {
    const now = Date.now();
    if (cachedUserCount !== null && now - lastFetchedUserCount < CACHE_TTL) {
      console.log("fetch from cache!");
      return cachedUserCount;
    }

    const count = await prisma.user.count();
    cachedUserCount = count;
    lastFetchedUserCount = now;
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const existingVisit = await prisma.visit.findFirst({
      where: {
        ip,
        userAgent: ua,
        createdAt: { gte: startOfToday },
      },
    });

    if (!existingVisit) {
      await prisma.visit.create({
        data: { ip, userAgent: ua },
      });
    }

    const total = await prisma.visit.count();
    cachedVisitCount = total;
    lastFetchedVisits = Date.now();

    return total;
  } catch (err) {
    console.error("❌ Error tracking visit:", err);
    return cachedVisitCount ?? 0;
  }
}

export async function getVisit() {
  try {
    const now = Date.now();
    if (cachedVisitCount !== null && now - lastFetchedVisits < CACHE_TTL) {
      console.log("fetch visits from cache!");
      return cachedVisitCount;
    }

    const total = await prisma.visit.count();
    cachedVisitCount = total;
    lastFetchedVisits = now;
    return total;
  } catch (err) {
    console.error("❌ Error getting visits:", err);
    return 0;
  }
}

