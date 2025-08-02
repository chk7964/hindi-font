import NextAuth, { type Account, type Profile, type User } from "next-auth";
import { prisma } from "./lib/prisma";
import { env } from "./config/env";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const isAuth = !!auth;
      const { pathname } = nextUrl;

      if (
        pathname.startsWith("/c/sign-in") &&
        isLoggedIn &&
        auth.user.role === "ADMIN"
      ) {
        return Response.redirect(
          new URL("/c/chk7964", env.NEXT_PUBLIC_SITE_URL)
        );
      }
      return isAuth;
    },

    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User;
      account?: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }): Promise<boolean> {
      if (profile?.login) {
        user.username = profile.login;
      }

      const userRecord = await prisma.users.findUnique({
        where: {
          email: user.email as string,
        },
      });

      // if (account?.provider === "github" && userRecord?.role !== "ADMIN") {
      //   console.error("error");
      //   throw new Error("You are not authorized to access this page");
      // }
      if (userRecord) {
        user.role = userRecord.role; // Assign role
      }
      if (account?.provider === "github" && !userRecord && user.email) {
        try {
          //   createUser
          await prisma.users.create({
            data: {
              email: user.email,
              role: "USER",
              username: user?.username ?? "",
              status: true,
            },
          });
        } catch (error) {
          console.error(error);
        } finally {
          await prisma.$disconnect();
        }
      }

      return !!userRecord;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/c/chk7964`; // Redirect after login
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    async session({ token, session }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  // cookies: {
  //   sessionToken: {
  //     name: "authjs.session-token",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production", // Secure in production
  //       sameSite: "lax",
  //       path: "/",
  //     },
  //   },
  // },
  pages: {
    signIn: "/c/sign-in",
    signOut: "/login",
    error: "/c/access-denied",
  },
  trustHost: true,
  debug: env.NODE_ENV === "development" ? true : false,
  secret: env.AUTH_SECRET,
  basePath: "/api/auth",
  useSecureCookies: env.NODE_ENV === "production" ? true : false,
});
