import Link from "next/link";
import React from "react";
import NavBarItems from "./NavBarItems";

const NavBar: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <div className="text-3xl font-extrabold">
        <span className="text-primaryColor">Dev</span>
        <span>Todo</span>
      </div>
      <NavBarItems />
    </div>
  );
};

export default NavBar;
