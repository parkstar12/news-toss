import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import Header from "@/components/ui/shared/Header";
import Footer from "@/components/ui/shared/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex">
      <main className="flex-1 flex flex-col overflow-hidden py-main pl-main">
        <div className="flex-1 bg-white rounded-main relative flex flex-col overflow-hidden">
          <Header />

          <div
            id="main-layout"
            className="flex-1 overflow-x-auto overflow-y-scroll pt-[100px] flex flex-col justify-between"
          >
            <div className="min-w-main-max w-full">{children}</div>
            <Footer />
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
