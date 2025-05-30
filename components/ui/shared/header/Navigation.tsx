"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  return (
    <nav className="flex gap-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <Link
        href="/home"
        className={clsx(
          pathname.startsWith("/home") ? "text-black font-semibold" : "text-sub"
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
  );
};

export default Navigation;
