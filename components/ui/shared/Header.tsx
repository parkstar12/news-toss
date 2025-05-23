"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginForm from "./LoginForm";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import newsTossLogo from "@/public/news-toss-logo.png";

const Header = () => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenMobileLogin, setIsOpenMobileLogin] = useState(false);

  const pathname = usePathname();
  const loginFormRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLoginFormRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(loginFormRef, () => {
    setIsOpenLoginForm(false);
  });
  useOutsideClick(mobileMenuRef, () => {
    setIsOpenMobileMenu(false);
    setIsOpenMobileLogin(false);
  });
  useOutsideClick(mobileLoginFormRef, () => {
    setIsOpenMobileLogin(false);
  });

  return (
    <header className="absolute w-full py-main px-[20px] z-50 backdrop-blur-sm bg-white/50">
      <div className="w-full flex relative gap-5 justify-between items-center">
        <div className="font-bold text-lg flex items-center gap-2">
          <div className="size-[40px] relative">
            <Image
              src={newsTossLogo}
              alt="news-toss-logo"
              fill
              className="rounded-main"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">NewsToss</span>
            <span className="text-sm text-main-dark-gray">
              실시간 주식 투자 AI 애널리스트
            </span>
          </div>
        </div>
        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex gap-5">
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
        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setIsOpenMobileMenu((prev) => !prev)}
        >
          <Menu size={24} />
        </button>
        {/* 로그인 버튼 (데스크탑에서만) */}
        <div className="relative size-fit hidden md:block">
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
            className={clsx(
              "absolute right-0 pt-2 duration-200 z-50",
              isOpenLoginForm ? "block" : "hidden"
            )}
          >
            <LoginForm />
          </div>
        </div>
        {/* 모바일 네비게이션 드로어 */}
        {isOpenMobileMenu && (
          <div
            ref={mobileMenuRef}
            className={clsx(
              "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
              isOpenMobileMenu
                ? "opacity-100 pointer-events-auto bg-black/40"
                : "opacity-0 pointer-events-none bg-black/0"
            )}
          >
            <div
              className={clsx(
                "absolute right-0 top-0 bg-white w-2/3 max-w-xs h-full shadow-lg p-6 flex flex-col gap-main transition-transform duration-300 rounded-l-main",
                isOpenMobileMenu ? "translate-x-0" : "translate-x-full"
              )}
            >
              <button
                className="self-end"
                onClick={() => setIsOpenMobileMenu(false)}
              >
                <X />
              </button>
              <Link
                href="/home"
                className={clsx(
                  pathname.startsWith("/home")
                    ? "text-black font-semibold"
                    : "text-sub",
                  "hover:bg-main-light-gray rounded px-2 py-1"
                )}
                onClick={() => setIsOpenMobileMenu(false)}
              >
                홈
              </Link>
              <Link
                href="/stock"
                className={clsx(
                  pathname.startsWith("/stock")
                    ? "text-black font-semibold"
                    : "text-sub",
                  "hover:bg-main-light-gray rounded px-2 py-1"
                )}
                onClick={() => setIsOpenMobileMenu(false)}
              >
                증권
              </Link>
              <Link
                href="/calendar"
                className={clsx(
                  pathname.startsWith("/calendar")
                    ? "text-black font-semibold"
                    : "text-sub",
                  "hover:bg-main-light-gray rounded px-2 py-1"
                )}
                onClick={() => setIsOpenMobileMenu(false)}
              >
                캘린더
              </Link>
              <Link
                href="/portfolio/my"
                className={clsx(
                  pathname.startsWith("/portfolio")
                    ? "text-black font-semibold"
                    : "text-sub",
                  "hover:bg-main-light-gray rounded px-2 py-1"
                )}
                onClick={() => setIsOpenMobileMenu(false)}
              >
                포트폴리오
              </Link>
              {/* 모바일 로그인 버튼 */}
              <button
                onClick={() => setIsOpenMobileLogin((prev) => !prev)}
                className="w-full bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
              >
                로그인
              </button>
              <div
                ref={mobileLoginFormRef}
                className={clsx(
                  "duration-200 z-50",
                  isOpenMobileLogin ? "block" : "hidden"
                )}
              >
                <LoginForm />
              </div>
            </div>
            {/* 오버레이 클릭 시 닫기 */}
            <div
              className="flex-1"
              onClick={() => setIsOpenMobileMenu(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
