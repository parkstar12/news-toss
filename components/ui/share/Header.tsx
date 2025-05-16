"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import useOutsideClick from "@/hooks/useOutsideClick";
const Header = () => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const pathname = usePathname();
  const loginFormRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(loginFormRef, () => {
    setIsOpenLoginForm(false);
  });

  return (
    <header className="absolute w-full p-[20px]">
      <div className="w-full flex relative gap-5 justify-between">
        <div className="">로고 및 프젝명</div>
        <div className="flex gap-5 px-[30px] py-[5px] bg-white shadow-color rounded-[10px]">
          <Link
            href="/home"
            className={`${
              pathname.startsWith("/home")
                ? "text-black font-semibold"
                : "text-sub"
            }`}
          >
            홈
          </Link>
          <Link
            href="/stock"
            className={`${
              pathname.startsWith("/stock")
                ? "text-black font-semibold"
                : "text-sub"
            }`}
          >
            증권
          </Link>
          <Link
            href="/calendar"
            className={`${
              pathname.startsWith("/calendar")
                ? "text-black font-semibold"
                : "text-sub"
            }`}
          >
            캘린더
          </Link>
          <Link
            href="/portfolio"
            className={`${
              pathname.startsWith("/portfolio")
                ? "text-black font-semibold"
                : "text-sub"
            }`}
          >
            포트폴리오
          </Link>
        </div>
        <div className="relative size-fit">
          <button
            onClick={() => {
              setIsOpenLoginForm(!isOpenLoginForm);
            }}
            className="bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
          >
            로그인
          </button>

          <div
            ref={loginFormRef}
            className={`absolute right-0 pt-2 duration-200 ${
              isOpenLoginForm ? "block" : "hidden"
            }`}
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
