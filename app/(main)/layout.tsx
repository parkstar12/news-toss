import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import Header from "@/components/ui/shared/header/Header";
import { getJwtToken } from "@/utils/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getJwtToken();

  return (
    <div className="w-screen h-screen flex">
      <main className="flex-1 flex flex-col overflow-hidden py-main pl-main">
        <div className="flex-1 rounded-main relative flex flex-col overflow-x-scroll bg-white">
          <Header />

          <div
            id="main-layout"
            className="flex-1 overflow-y-scroll pt-[100px] flex flex-col justify-between"
          >
            <div className="grow shrink-0 min-w-[1000px]">{children}</div>
          </div>
        </div>
      </main>
      <Sidebar token={token} />
    </div>
  );
}
