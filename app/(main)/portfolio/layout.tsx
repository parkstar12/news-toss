import React from "react";
import SideMenus from "./SideMenus";
const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-[30px] flex gap-main">
      <aside className="flex flex-col gap-main">
        <SideMenus />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PortfolioLayout;
