import { betterAuth } from "better-auth";
import { prisma } from "@repo/db";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const allowedOrigins =
  process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(",").map(o => o.trim()) ?? [
    "http://localhost:3000",
    "https://drawing.tejaspr.site",
  ];

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  callbackURL: "/",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    nextCookies(),
    // {
    //   id: "cors-plugin",
    //   async onRequest(request, ctx) {
    //     const origin = request.headers.get("origin");
    //     const responseHeaders = new Headers();

    //     if (origin && allowedOrigins.includes(origin)) {
    //       responseHeaders.set("Access-Control-Allow-Origin", origin);
    //       responseHeaders.set("Vary", "Origin");
    //       responseHeaders.set(
    //         "Access-Control-Allow-Methods",
    //         "GET,POST,OPTIONS"
    //       );
    //       responseHeaders.set(
    //         "Access-Control-Allow-Headers",
    //         "Content-Type, Authorization"
    //       );
    //       responseHeaders.set("Access-Control-Allow-Credentials", "true");
    //     }

    //     if (request.method === "OPTIONS") {
    //       return {
    //         response: new Response(null, {
    //           status: 204,
    //           headers: responseHeaders,
    //         }),
    //       };
    //     }

    //     return {
    //       request: new Request(request, { headers: request.headers }),
    //     };
    //   },
    // },
  ],
});
