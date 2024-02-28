import React from "react";

const RepositoryListLoading: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-5">
      <div className="animate-pulse flex flex-col gap-2">
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w1/2 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w-full bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
      </div>
      <div className="animate-pulse flex flex-col gap-2">
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w1/2 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w-full bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
      </div>
      <div className="animate-pulse flex flex-col gap-2">
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w1/2 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w-full bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
      </div>
      <div className="animate-pulse flex flex-col gap-2">
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w1/2 bg-slate-400 h-3 rounded-lg "></div>
        <div className="w-full bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
        <div className="w-1/3 bg-slate-400 h-3 rounded-lg"></div>
      </div>
    </div>
  );
};

export default RepositoryListLoading;
