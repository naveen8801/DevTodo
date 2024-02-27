import React from "react";

const Loading = () => {
  return (
    <div className="text-sm text-slate-400">
      <div className="animate-pulse flex flex-col gap-2">
        <div className="w-full bg-slate-200 h-4 rounded-lg"></div>
        <div className="w-full bg-slate-200 h-4 rounded-lg"></div>
        <div className="w-full bg-slate-200 h-4 rounded-lg"></div>
        <div className="w-full bg-slate-200 h-4 rounded-lg"></div>
        <div className="w-full bg-slate-200 h-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Loading;
