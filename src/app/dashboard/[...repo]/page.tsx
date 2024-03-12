import { handleSearchRepo } from "@/actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

interface IProp {
  params: { repo: string };
}

const Repo: React.FC<IProp> = async ({
  params,
}): Promise<React.ReactElement> => {
  // Get session from server
  const session = await getServerSession();
  const { repo } = params;

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { data, error } = await handleSearchRepo(`${repo[0]}/${repo[1]}`);

  return <div>{`${repo[0]}/${repo[1]}`}</div>;
};

export default Repo;
