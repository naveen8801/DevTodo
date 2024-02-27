import { getUser } from "@/actions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session.user?.email!);

  return (
    <div>
      <div className="h-full flex flex-col items-center justify-center">
        <Link href={process.env.GITHUB_PUBLIC_URL!}>
          <button className="px-4 py-2 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-medium">
            <FaGithub size={20} />
            Connect your Github Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
