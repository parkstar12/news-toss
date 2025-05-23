import React from "react";
import { Monitor } from "lucide-react";
// import Image from "next/image";
// import newsTossLogo from "@/public/news-toss-logo.png";

export default function OnlyDesktopPage() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <Monitor size={64} className="mb-6 text-main-blue" />
      <h1 className="text-2xl font-bold text-main-dark-gray mb-2">
        데스크탑에서 접속해 주세요
      </h1>

      {/* <Image src={newsTossLogo} alt="news-toss-logo" width="100" height="100" /> */}

      <p className="text-main-dark-gray text-base text-center mb-2">
        PC(데스크탑) 환경에서만 이용하실 수 있습니다.
      </p>
      <p className="text-main-dark-gray text-sm text-center">
        더 넓은 화면에서 쾌적하게 서비스를 이용해 주세요.
      </p>
    </div>
  );
}
