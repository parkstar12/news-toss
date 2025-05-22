import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-[100px]">{children}</div>;
};

export default HomeLayout;
