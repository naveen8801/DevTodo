"use client";
import { handleOpenGithubIssueInRepo } from "@/actions";
import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

interface IProps {
  path: string;
  url: string;
  handleOpenGithubIssue: () => any;
}

const BlobCardHeader: React.FC<IProps> = (props): React.ReactElement => {
  const { path, url, handleOpenGithubIssue } = props;

  const handleAction = async () => {
    const { data, error } = await handleOpenGithubIssue();
    if (error) {
      toast.error(error);
    }
    if (data) {
      toast.success("Github Issue opened successfully");
    }
  };

  return (
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
  );
};

export default BlobCardHeader;
