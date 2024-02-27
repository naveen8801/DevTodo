"use client";
import { FaGithub } from "react-icons/fa";
import { handleGithubSignIn } from "@/actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const session = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <form action={handleGithubSignIn}>
        <button className="px-4 py-2 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-medium">
          <FaGithub size={20} />
          Sign In With Github{" "}
        </button>
      </form>
    </div>
  );
}
