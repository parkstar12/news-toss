"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import useOutsideClick from "@/hooks/useOutsideClick";
import clsx from "clsx";
import Image from "next/image";
import newsTossLogo from "@/public/news-toss-logo.png";
import UserInfo from "./UserInfo";

const Header = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const isLogin = false;

  const pathname = usePathname();
  const loginFormRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(loginFormRef, () => {
    setIsOpenForm(false);
  });

  return (
    <header className="absolute w-full py-main px-[20px] z-50 backdrop-blur-sm bg-white/50 min-w-[800px]">
      <div className="w-full flex relative gap-5 justify-between items-center">
        <div className="font-bold text-lg flex items-center gap-2">
          <Link href="/home" className="size-[40px] relative">
            <Image
              src={newsTossLogo}
              alt="news-toss-logo"
              fill
              className="rounded-main"
            />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-lg">NewsToss</span>
            <span className="text-sm text-main-dark-gray">
              실시간 주식 투자 AI 애널리스트
            </span>
          </div>
        </div>
        {/* 데스크탑 네비게이션 */}
        <nav className="flex gap-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Link
            href="/home"
            className={clsx(
              pathname.startsWith("/home")
                ? "text-black font-semibold"
                : "text-sub"
            )}
          >
            홈
          </Link>
          <Link
            href="/stock"
            className={clsx(
              pathname.startsWith("/stock")
                ? "text-black font-semibold"
                : "text-sub"
            )}
          >
            증권
          </Link>
          <Link
            href="/calendar"
            className={clsx(
              pathname.startsWith("/calendar")
                ? "text-black font-semibold"
                : "text-sub"
            )}
          >
            캘린더
          </Link>
          <Link
            href="/portfolio/my"
            className={clsx(
              pathname.startsWith("/portfolio")
                ? "text-black font-semibold"
                : "text-sub"
            )}
          >
            포트폴리오
          </Link>
        </nav>

        <div className="relative size-fit">
          {isLogin ? (
            <button
              className="text-main-dark-gray"
              onClick={() => setIsOpenForm(!isOpenForm)}
            >
              <b className="underline">{"홍길동"}</b> 님
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpenForm(!isOpenForm);
              }}
              className="bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
            >
              로그인
            </button>
          )}

          <div
            ref={loginFormRef}
            className={clsx(
              "absolute right-0 pt-2 duration-200 z-50",
              isOpenForm ? "block" : "hidden"
            )}
          >
            {isLogin ? <UserInfo /> : <LoginForm />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
