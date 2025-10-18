// lib/prismaDynamic.ts
import { PrismaClient } from "@repo/db";

type TenantConfig = {
  databaseUrl: string;
};

export function createPrismaClient(config: TenantConfig): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      },
    },
  });
}