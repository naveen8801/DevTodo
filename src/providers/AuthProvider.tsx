"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface IProp {
  children?: React.ReactNode;
  session: any;
}

const AuthProvider: React.FC<IProp> = ({
  children,
  session,
}): React.ReactElement => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
