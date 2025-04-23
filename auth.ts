import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      const userAlreadyExist = await db.user.count({
        where: {
          email: {
            equals: user?.email,
            mode: "insensitive",
          },
        },
      });

      if (!userAlreadyExist) {
        await db.user.create({
          data: {
            email: user?.email,
            name: user?.name,
            image: user?.image,
            emailVerified: new Date(),
          },
        });
      }
      return true;
    },
    // async session({ token, session }) {
    //   if (token) {
    //     session!.user!.id = token.id;
    //     session!.user!.name = token.name;
    //     session!.user!.email = token.email!;
    //     session!.user!.image = token.picture;
    //   }
    //   const modifiedSession = {
    //     ...session,
    //     user: token as unknown,
    //   };

    //   return modifiedSession as Session;
    // },
    async jwt({ token, user }): Promise<JWT> {
      const dbUser = await db.user.findFirst({
        where: {
          email: token?.email as string,
        },
      });
      if (!dbUser) {
        if (user?.id) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
  },
});
