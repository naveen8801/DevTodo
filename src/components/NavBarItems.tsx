"use client";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBarItems: React.FC = (): React.ReactElement => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated" ? true : false;
  const data = session.data;
  console.log({ session });
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-center gap-8">
      {!isAuthenticated && (
        <Link href="/login">
          <div className="text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor">
            Sign In
          </div>
        </Link>
      )}

      {isAuthenticated && (
        <div
          onClick={handleSignOut}
          className="text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor"
        >
          Sign Out
        </div>
      )}

      {isAuthenticated && (
        <div
          onClick={handleSignOut}
          className="text-lg font-semibold text-primaryColor flex items-center justify-center gap-2"
        >
          <span>
            <Image
              className="rounded-full"
              src={data?.user?.image!}
              alt="avatar"
              width={40}
              height={40}
            />
          </span>
          Hey {data?.user?.name}
        </div>
      )}

      <ThemeSwitcher />
    </div>
  );
};

export default NavBarItems;
