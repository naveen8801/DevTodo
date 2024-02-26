import React from "react";
import LayoutProvider from "./LayoutProvider";
import MyThemeProvider from "./ThemeProvider";

interface IProp {
  children?: React.ReactNode;
}

const MainProvider: React.FC<IProp> = ({ children }): React.ReactElement => {
  return (
    <div>
      <MyThemeProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </MyThemeProvider>
    </div>
  );
};

export default MainProvider;
