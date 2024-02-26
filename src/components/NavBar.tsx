import ThemeSwitcher from "./../utils/ThemeSwitcher";
import React from "react";

const NavBar: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <div></div>
      <ThemeSwitcher />
    </div>
  );
};

export default NavBar;
