import { config } from "@/auth";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = config;
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
