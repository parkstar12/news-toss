import React from "react";
import newsTossLogo from "@/public/news-toss-logo.png";
import Image from "next/image";
import Link from "next/link";
import { getJwtToken } from "@/utils/auth";
import clsx from "clsx";
import LoginForm from "./LoginForm";
import { cookies, headers } from "next/headers";
import UserInfo from "./UserInfo";
import { revalidatePath } from "next/cache";
import LogoutForm from "./LogoutForm";

const Header = async () => {
  const token = await getJwtToken();
  const headerList = await headers();
  const pathname = headerList.get("x-pathname");

  const handleLogout = async () => {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    revalidatePath("/home");
  };

  return (
    <header className="absolute w-full py-main px-[20px] z-50 backdrop-blur-sm min-w-[800px]">
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

        {/* 네비게이션 (홈, 증권, 캘린더, 포트폴리오) */}
        {pathname && pathname !== "/" && (
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
        )}

        {/* 로그인 상태에 따라 로그인 버튼 또는 유저 정보 표시 */}
        {pathname !== "/" && !token && (
          <div className="relative size-fit">
            <LoginForm />
          </div>
        )}

        {pathname !== "/" && token && (
          <div className="relative size-fit">
            <UserInfo token={token}>
              <LogoutForm action={handleLogout} />
            </UserInfo>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
