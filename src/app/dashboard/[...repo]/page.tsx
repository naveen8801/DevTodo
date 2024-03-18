import { handleGetRepo, handleSearchRepo } from "@/actions";
import BlobCard from "@/components/BlobCard";
import moment from "moment";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { FaUserPlus, FaCodeBranch } from "react-icons/fa";

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

  const repoObj = await handleGetRepo(repo[1], repo[0]);
  if (repoObj?.error) {
  }

  const { data, error } = await handleSearchRepo(`${repo[0]}/${repo[1]}`);

  return (
    <div className=" h-full box-border rounded-lg p-4 overflow-auto">
      <div className="mb-4">
        <div className="w-full h-fit flex flex-col md:flex-row md:items-center md:justify-start gap-4 mb-2">
          <span className="font-bold text-2xl">{repoObj?.data?.name}</span>
          <div className="flex flex-row items-center justify-between gap-3 text-slate-500 text-xs dark:text-slate-400">
            {/* <div className=" flex items-center gap-1 ">
              <FaUserPlus size={15} />
              {`Created At: ${moment(repoObj?.data?.created_at).fromNow()}`}
            </div> */}
            <div className="flex items-center gap-1">
              <FaCodeBranch size={15} />
              {`Last Pushed: ${moment(repoObj?.data?.pushed_at).fromNow()}`}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <label className="text-sm">Enable Pull Request Scanning</label>
          </div>
          {/* <div className="flex items-center gap-1">
            <input type="checkbox" />
            <label className="text-sm">Enable Weekly Email Notifications</label>
          </div> */}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {repoObj?.data?.description}
        </p>
      </div>

      {data?.length === 0 && (
        <div className="text-center font-semibold"> No TODOs Found !</div>
      )}
      {data?.length! > 0 && (
        <span className="text-slate-500 text-xs font-semibold dark:text-slate-400 mb-2">
          {`Found ${data?.length} TODOs`}
        </span>
      )}
      {data?.map((itm) => (
        <BlobCard key={itm?.id} {...itm} />
      ))}
    </div>
  );
};

export default Repo;
