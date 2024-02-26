import Footer from "./../components/Footer";
import NavBar from "./../components/NavBar";
import React from "react";

interface IProp {
  children?: React.ReactNode;
}

const LayoutProvider: React.FC<IProp> = ({ children }): React.ReactElement => {
  return (
    <div className="h-screen flex flex-col box-border">
      <NavBar />
      <div className="h-full overflow-auto box-border px-16 p-2 md:px-24 lg:px-48 md:p-4 lg:p-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutProvider;
