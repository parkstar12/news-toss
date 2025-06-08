"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { JwtToken } from "@/type/jwt";
import { toast } from "react-toastify";

const SideMenus = ({ token }: { token: JwtToken | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     toast.error("로그인 후 이용해주세요.");
  //     router.replace("/news");
  //   }
  // }, [token, router]);

  const navLinks = [
    { href: "/portfolio/my", label: "내 포트폴리오" },
    { href: "/portfolio/analysis", label: "내 포트폴리오 분석" },
    { href: "/portfolio/compare", label: "포트폴리오 비교 분석" },
  ];

  return (
    <nav className="flex flex-col gap-main w-full sticky top-0 shrink-0 min-w-[175px]">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "px-[20px] py-2 rounded-main transition-colors",
            pathname === link.href
              ? "bg-main-light-gray text-black"
              : "hover:bg-main-light-gray text-main-dark-gray"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default SideMenus;
