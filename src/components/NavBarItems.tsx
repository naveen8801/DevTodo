"use client";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";

const NavBarItems: React.FC = (): React.ReactElement => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated" ? true : false;
  const data = session.data;

  return (
    <div className="flex items-center justify-center gap-8">
      {!isAuthenticated && (
        <div
          onClick={async () => {
            await signIn("github");
          }}
          className="text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor flex items-center justify-center gap-2"
        >
          <FaGithub size={20} /> Sign In
        </div>
      )}

      {isAuthenticated && (
        <button
          onClick={async () => {
            await signOut({ callbackUrl: "/" });
          }}
          className="text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor"
        >
          Sign Out
        </button>
      )}

      {isAuthenticated && (
        <div className="text-lg font-semibold text-primaryColor flex items-center justify-center gap-2">
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
