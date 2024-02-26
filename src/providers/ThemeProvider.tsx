"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

interface IProp {
  children?: React.ReactNode;
}

const MyThemeProvider: React.FC<IProp> = ({ children }): React.ReactElement => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
