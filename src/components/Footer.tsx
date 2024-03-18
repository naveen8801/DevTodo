import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-end items-center px-16">
      {/* <Link
        href="https://github.com/naveen8801/DevTodo"
        target="_blank"
        className="flex gap-2 items-center justify-center text-lg font-semibold hover:font-bold hover:cursor-pointer hover:text-primaryColor"
      >
        <FaGithub size={28} />
      </Link> */}
    </div>
  );
};

export default Footer;
