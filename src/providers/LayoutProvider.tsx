import React from "react";

interface IProp {
  children?: React.ReactNode;
}

const LayoutProvider: React.FC<IProp> = ({ children }): React.ReactElement => {
  return (
    <div className="h-screen flex flex-col box-border">
      NavBar
      <div className="h-full overflow-auto box-border">{children}</div>
      Footer
    </div>
  );
};

export default LayoutProvider;
