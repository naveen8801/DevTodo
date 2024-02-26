"use client";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Login() {
  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div
        className="px-4 py-2 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-medium"
        onClick={handleSignIn}
      >
        <FaGithub size={20} />
        Sign In With Github{" "}
      </div>
    </div>
  );
}
