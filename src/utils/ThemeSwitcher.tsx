"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ThemeSwitcher: React.FC = (): React.ReactElement => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MdDarkMode
          className="animate-pulse hover:cursor-pointer hover:scale-105"
          size={30}
          onClick={() => setTheme("light")}
        >
          Enable light
        </MdDarkMode>
      );
    } else {
      return (
        <MdLightMode
          className="animate-pulse hover:cursor-pointer hover:scale-105"
          size={30}
          onClick={() => setTheme("dark")}
        >
          Enable Dark
        </MdLightMode>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
};

export default ThemeSwitcher;
