import { handleGetUser, handleUpdateUserInstallationId } from "@/actions";
import ErrorText from "@/components/ErrorText";
import InstallationHandler from "@/components/InstallationHandler";
import { IUser } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { FaGithub } from "react-icons/fa";

type ISearchParams = {
  installation_id: string;
  setup_action: "create" | "update";
};

const Dashboard = async ({ searchParams }: { searchParams: ISearchParams }) => {
  // Get session from server
  const session = await getServerSession();

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  // If installation_id is present in searchParams then return InstallationHandler method to update user obj with installation id in DB
  const github_installation_id = searchParams?.installation_id;
  if (github_installation_id) {
    return (
      <InstallationHandler
        email={session.user?.email!}
        installation_id={github_installation_id}
      />
    );
  }

  // Fetch current user from DB using email from session
  const { data, error } = await handleGetUser(session.user?.email!);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ErrorText>{error}</ErrorText>
      </div>
    );
  }

  const { installationId, name } = data as IUser;

  if (!installationId) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <span className="text-center">
          Hi {name?.trim() || "User"}, Please click on following button to
          install <strong className="text-primaryColor">DevTodo</strong> github
          app
        </span>
        <Link href={process.env.GITHUB_PUBLIC_URL!}>
          <button className="px-4 py-2 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-medium">
            <FaGithub size={20} />
            Connect your Github Account
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>{installationId}</div>
      <Link href={process.env.GITHUB_PUBLIC_URL!}>
        <button className="px-4 py-2 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-medium">
          <FaGithub size={20} />
          Configure Github App
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
