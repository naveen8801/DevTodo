"use client";
import React, { ReactElement, useState } from "react";
import SearchField from "./SearchField";
import RepositoryList from "./RepositoryList";

interface IProp {
  installation_id: string;
}

const RepositoryViewer: React.FC<IProp> = (props): ReactElement => {
  const { installation_id } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="w-full h-3/4 box-border rounded-lg p-4 overflow-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:border dark:border-slate-500">
      <div>
        <SearchField
          value={searchValue}
          placeholder="Search Repository"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <span className="text-slate-500 text-xs font-bold dark:text-slate-400">{`Results Found : ${0}`}</span>
      </div>
      <div className="my-4 bg-black h-8 p-2 box-border">
        <RepositoryList installation_id={installation_id} />
      </div>
    </div>
  );
};

export default RepositoryViewer;
