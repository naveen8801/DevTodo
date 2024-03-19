import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-end items-center px-16">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        © Copyright 2024 DevTodo. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
