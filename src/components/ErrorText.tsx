import React from "react";

interface IProp {
  children?: React.ReactNode;
}

const ErrorText: React.FC<IProp> = ({ children }): React.ReactElement => {
  return (
    <div className="w-full bg-red-500 text-white px-4 py-8 rounded-xl">
      <div className="text-lg font-bold">Error</div>
      {children}
    </div>
  );
};

export default ErrorText;
