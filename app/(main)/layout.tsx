import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import Footer from "@/components/ui/shared/Footer";
import Header from "@/components/ui/shared/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex">
      <main className="flex-1 flex flex-col overflow-hidden py-main pl-main">
        <div className="flex-1 bg-white rounded-main relative flex flex-col overflow-x-scroll">
          <Header />

          <div
            id="main-layout"
            className="flex-1 overflow-y-scroll pt-[100px] flex flex-col justify-between"
          >
            <div className="grow shrink-0 min-w-[1000px]">{children}</div>
            <Footer />
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
