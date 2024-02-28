"use client";
import React, { ReactElement, Suspense, useState } from "react";
import SearchField from "./SearchField";
import RepositoryList from "./RepositoryList";
import RepositoryListLoading from "./RepositoryListLoading";

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
      </div>
      <div className="my-2 py-2 box-border">
        <Suspense fallback={<RepositoryListLoading />}>
          <RepositoryList
            installation_id={installation_id}
            searchValue={searchValue}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default RepositoryViewer;
