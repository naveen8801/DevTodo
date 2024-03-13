import { handleSearchRepo } from "@/actions";
import BlobCard from "@/components/BlobCard";
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
  console.log({ data, error });

  return (
    <div className=" h-full box-border rounded-lg p-4 overflow-auto">
      {data?.length! === 0 && (
        <span className="text-slate-500 text-xs font-semibold dark:text-slate-400 mb-2">
          No TODOs Found !
        </span>
      )}
      {data?.map((itm) => (
        <BlobCard key={itm?.id} {...itm} />
      ))}
    </div>
  );
};

export default Repo;
