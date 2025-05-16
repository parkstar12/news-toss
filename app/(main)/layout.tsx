import Sidebar from "@/components/ui/Sidebar";
import React from "react";
import Link from "next/link";
import Header from "@/components/ui/share/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full flex">
      <main className="flex-1 size-full py-[10px] pl-[10px]">
        <div className="size-full bg-white rounded-[10px] relative overflow-y-scroll">
          <Header />
          {/* <div className="w-[10px] h-[1000px]"></div> */}
          {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/">123</Link>
              </div>
            </div>
          </header> */}
          <div className="size-full pt-[80px]">{children}</div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
