"use client";
import { useRouter } from "next/router";
import React from "react";

interface IProp {
  params: { repo: string };
}

const Repo: React.FC<IProp> = ({ params }): React.ReactElement => {
  const { repo } = params;

  return <div>{repo}</div>;
};

export default Repo;
