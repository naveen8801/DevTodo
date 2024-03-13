import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface IProp {
  id: string;
  name: string;
  path: string;
  url: string;
  git_url: string;
}

const BlobCard: React.FC<IProp> = (props): React.ReactElement => {
  const { id, name, path, url, git_url } = props;

  return (
    <div className="rounded-md h-fit box-border p-2 my-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border dark:border-slate-500 hover:cursor-pointer hover:bg-slate-100 dark:hover:hover:bg-slate-800">
      <div className="flex flex-row justify-between items-center">
        <span>{path}</span>
        <div className="flex flex-row justify-between items-center gap-2 hover:cursor-pointer hover:text-primaryColor">
          <Link href={{ pathname: url }} target="_blank">
            <FaExternalLinkAlt size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlobCard;
