import { handleUpdateUserInstallationId } from "@/actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import ErrorText from "./ErrorText";

interface IProp {
  email: string;
  installation_id: string;
}

const InstallationHandler: React.FC<IProp> = async ({
  email,
  installation_id,
}) => {
  const { data, error } = await handleUpdateUserInstallationId(
    email,
    installation_id
  );
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ErrorText>{error}</ErrorText>
      </div>
    );
  }
  if (data) {
    redirect("/dashboard");
  }

  return (
    <div className="animate-pulse">
      <div className="w-full bg-slate-400 h-2 rounded-lg"></div>
      <div className="w-full bg-slate-400 h-2 rounded-lg"></div>
      <div className="w-full bg-slate-400 h-2 rounded-lg"></div>
      <div className="w-full bg-slate-400 h-2 rounded-lg"></div>
      <div className="w-full bg-slate-400 h-2 rounded-lg"></div>
    </div>
  );
};

export default InstallationHandler;
