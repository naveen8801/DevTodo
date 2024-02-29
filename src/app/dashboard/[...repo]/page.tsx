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

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { repo } = params;

  return <div>{repo}</div>;
};

export default Repo;
