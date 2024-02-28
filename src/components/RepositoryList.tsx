import { handleGetRepositoryList } from "@/actions";
import React, { useMemo } from "react";
import ErrorText from "./ErrorText";

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
      <span className="text-slate-500 text-xs font-semibold dark:text-slate-400 mb-2">{`Total Results Found : ${0}`}</span>
      {data
        ?.filter((itm: any) => itm?.fullName?.includes(searchValue?.trim()))
        ?.map((repo: any) => (
          <div key={repo?.id}>
            {repo?.fullName}
            {repo?.description}
          </div>
        ))}
    </div>
  );
};

export default RepositoryList;
