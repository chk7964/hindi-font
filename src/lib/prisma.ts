/* eslint-disable no-unused-vars */

import { PrismaClient } from "@/generated/prisma";

let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
} catch (error) {
  console.error("Failed to initialize Prisma Client:", error);
  throw new Error("Prisma Client initialization failed");
}

export { prisma };

// import { env } from "@/config/env";
// import { PrismaClient } from "@/generated/prisma";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient();

// if (env.NODE_ENV === "development") global.prisma = prisma;

// export { prisma };
