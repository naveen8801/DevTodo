import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, DefaultUser } from "next-auth";
import { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/User";
import connectDB from "@/utils/ConnectDB";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    id?: string | null;
    username?: string | null;
  }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      return { ...session, token: token.accessToken };
    },
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        await connectDB();
        try {
          const existingUser = await User.findOne({
            email: user.email!,
          });
          if (!existingUser) {
            const newUser = User.create({
              id: user?.id || "",
              name: user.name!,
              email: user.email!,
              avatar: user.image!,
              username: user.username! || "",
            });
            await newUser.create();
            console.log("User created successfully in DB");
          } else if (!existingUser?.username || !existingUser?.id) {
            const username = user.username!;
            const id = user.id!;
            const newUser = await User.findOneAndUpdate(
              {
                email: user.email!,
              },
              {
                username,
                id,
              }
            );
            console.log("User updated successfully in DB");
          }
        } catch (error) {
          console.log(error);
          console.log("Error while creating user in DB");
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
