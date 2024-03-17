import React from "react";
import LayoutProvider from "./LayoutProvider";
import MyThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";

interface IProp {
  children?: React.ReactNode;
}

const MainProvider: React.FC<IProp> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <div>
      <Toaster
        toastOptions={{
          className: "dark:bg-black dark:text-slate-100",
        }}
      />
      <MyThemeProvider>
        <AuthProvider session={session}>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </MyThemeProvider>
    </div>
  );
};

export default MainProvider;
