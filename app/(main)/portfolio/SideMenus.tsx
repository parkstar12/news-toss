"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SideMenus = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/portfolio/my", label: "내 포트폴리오" },
    { href: "/portfolio/compare", label: "포트폴리오 비교 분석" },
    { href: "/portfolio/analysis", label: "내 포트폴리오 분석" },
    { href: "/portfolio/info", label: "내 정보" },
  ];

  return (
    <nav className="flex flex-col gap-main w-full sticky top-0">
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
