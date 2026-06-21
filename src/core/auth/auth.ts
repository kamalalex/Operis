import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database/prisma";
import { z } from "zod";
import { verifyPassword } from "../../shared/lib/crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        
        // Find the user and load their associated role details
        const user = await prisma.user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user || !user.password) {
          return null;
        }

        const parts = user.password.split(":");
        if (parts.length !== 2) {
          return null;
        }
        const [salt, hash] = parts;

        const isPasswordCorrect = verifyPassword(password, salt, hash);
        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role?.name || "User",
          permissions: user.role?.permissions || [],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub || "";
        (session.user as any).role = token.role || "User";
        (session.user as any).permissions = token.permissions || [];
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
});
