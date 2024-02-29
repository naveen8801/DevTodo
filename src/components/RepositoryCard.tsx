import React from "react";
import { FaLock } from "react-icons/fa6";
import { FaExternalLinkAlt, FaUserPlus, FaUserClock } from "react-icons/fa";
import moment from "moment";
import { redirect } from "next/navigation";
import Link from "next/link";

interface IProp {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  isPrivate: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

const RepositoryCard: React.FC<IProp> = (props): React.ReactElement => {
  const {
    id,
    name,
    fullName,
    description,
    isPrivate,
    url,
    created_at,
    updated_at,
    archived,
  } = props;

  return (
    <div className="w-full px-4 py-2 rounded-lg my-2 min-h-20 box-border shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border dark:border-slate-500 hover:cursor-pointer hover:bg-slate-100 dark:hover:hover:bg-slate-800 ">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between gap-2">
          {isPrivate && <FaLock size={18} />}
          <strong>{fullName}</strong>
        </div>
        <div className="hover:cursor-pointer hover:text-primaryColor">
          <Link href={url} target="_blank">
            <FaExternalLinkAlt size={16} />
          </Link>
        </div>
      </div>
      <div className="text-slate-500 text-sm dark:text-slate-400">
        {`${description?.slice(0, 100)}${
          description?.length! > 100 ? "..." : ""
        }`}
      </div>
      <div className="flex flex-row items-center justify-end gap-3 text-slate-500 text-xs dark:text-slate-400 mt-2">
        <div className="flex items-center gap-1">
          <FaUserClock size={15} />
          {`Last Modified: ${moment(updated_at).fromNow()}`}
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
