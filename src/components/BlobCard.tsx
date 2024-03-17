import Link from "next/link";
import React, { Suspense } from "react";
import BlobViewer from "./BlobViewer";
import { handleOpenGithubIssueInRepo } from "@/actions";
import BlobCardHeader from "./BlobCardHeader";

interface IProp {
  id: string;
  name: string;
  path: string;
  url: string;
  git_url: string;
}

const BlobCard: React.FC<IProp> = (props): React.ReactElement => {
  const { id, name, path, url, git_url } = props;

  const handleOpenGithubIssue = async () => {
    "use server";
    const { data, error } = await handleOpenGithubIssueInRepo(props);
    return { data, error };
  };

  return (
    <div className="rounded-md h-fit box-border p-2 my-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border dark:border-slate-500 hover:cursor-pointer hover:bg-slate-100 dark:hover:hover:bg-slate-800">
      <BlobCardHeader
        {...props}
        handleOpenGithubIssue={handleOpenGithubIssue}
      />
      <div className="mx-2">
        <Suspense fallback={<>Loading...</>}>
          <BlobViewer url={git_url} />
        </Suspense>
      </div>
    </div>
  );
};

export default BlobCard;
