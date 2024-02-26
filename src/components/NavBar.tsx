import Link from "next/link";
import ThemeSwitcher from "./../utils/ThemeSwitcher";
import React from "react";

const NavBar: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <div className="text-3xl font-extrabold">
        <span className="text-primaryColor">Dev</span>
        <span>Todo</span>
      </div>
      <div className="flex items-center justify-center gap-8">
        <Link href="/login">
          <div className="text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor">
            Sign In
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default NavBar;
