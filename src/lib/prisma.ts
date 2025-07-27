/* eslint-disable no-unused-vars */
// prisma/client.ts
// import { PrismaClient } from "~/prisma/custom";

// let prisma: PrismaClient;

// try {
//   prisma = new PrismaClient({
//     // log: ["query", "info", "warn", "error"],
//   });
// } catch (error) {
//   console.error("Failed to initialize Prisma Client:", error);
//   throw new Error("Prisma Client initialization failed");
// }

// export default prisma;
import { env } from "@/config/env";
import { PrismaClient } from "@/generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
