import Link from "next/link";
import React, { Suspense } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import BlobViewer from "./BlobViewer";
import { handleOpenGithubIssueInRepo } from "@/actions";

interface IProp {
  id: string;
  name: string;
  path: string;
  url: string;
  git_url: string;
}

const BlobCard: React.FC<IProp> = (props): React.ReactElement => {
  const { id, name, path, url, git_url } = props;

  const handleAction = async () => {
    "use server";
    const { data, error } = await handleOpenGithubIssueInRepo(props);
  };

  return (
    <div className="rounded-md h-fit box-border p-2 my-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border dark:border-slate-500 hover:cursor-pointer hover:bg-slate-100 dark:hover:hover:bg-slate-800">
      <div className="flex flex-row justify-between items-center">
        <span className="text-md font-semibold">{path}</span>
        <div className="flex flex-row justify-between items-center gap-2">
          <form action={handleAction}>
            <button className="px-2 py-1 text-black rounded-lg flex items-center justify-center gap-2 bg-buttonBgColor hover:cursor-pointer hover:font-md">
              <FaGithub size={20} />
              Open Issue
            </button>
          </form>

          <a
            href={url}
            target="_blank"
            className="hover:cursor-pointer hover:text-primaryColor"
          >
            <FaExternalLinkAlt size={16} />
          </a>
        </div>
      </div>
      <div className="mx-2">
        <Suspense fallback={<>Loading...</>}>
          <BlobViewer url={git_url} />
        </Suspense>
      </div>
    </div>
  );
};

export default BlobCard;
