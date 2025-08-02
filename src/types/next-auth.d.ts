/* eslint-disable no-unused-vars */
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
    role?: string | null;
  }

  interface Profile {
    login: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
  }
}
