import React from "react";
import LayoutProvider from "./LayoutProvider";
import MyThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { getServerSession } from "next-auth";

interface IProp {
  children?: React.ReactNode;
}

const MainProvider: React.FC<IProp> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <div>
      <MyThemeProvider>
        <AuthProvider session={session}>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </MyThemeProvider>
    </div>
  );
};

export default MainProvider;
