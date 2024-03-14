"use server";
import { handleGetRepositoryList } from "@/actions";
import React, { useMemo } from "react";
import ErrorText from "./ErrorText";
import RepositoryCard from "./RepositoryCard";

interface IProp {
  installation_id: string;
  searchValue: string;
}

const RepositoryList: React.FC<IProp> = async (
  props
): Promise<React.ReactElement> => {
  const { installation_id, searchValue } = props;

  const { data, error } = await handleGetRepositoryList(installation_id);

  //   if (error) {
  //     return (
  //       <div className="h-full flex flex-col items-center justify-center">
  //         <ErrorText>{error}</ErrorText>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <span className="text-slate-500 text-xs font-semibold dark:text-slate-400 mb-2">{`Total Results Found : ${
        data?.filter((itm: any) => itm?.fullName?.includes(searchValue?.trim()))
          ?.length || 0
      }`}</span>
      {(!data ||
        data?.filter((itm: any) => itm?.fullName?.includes(searchValue?.trim()))
          ?.length === 0) && (
        <div className="text-center font-semibold">No Repository Found</div>
      )}
      {data
        ?.filter((itm: any) => itm?.fullName?.includes(searchValue?.trim()))
        ?.map((repo: any) => (
          <RepositoryCard {...repo} />
        ))}
    </div>
  );
};

export default RepositoryList;
