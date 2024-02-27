import connectDB from "@/utils/ConnectDB";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/Models/User";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      return session;
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
              name: user.name!,
              email: user.email!,
              avatar: user.image!,
            });
            await newUser.create();
            console.log("User created successfully in DB");
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
});

export { handler as GET, handler as POST };
