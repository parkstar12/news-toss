"use client";

import clsx from "clsx";
import { Clock, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import { useDebounce } from "@/hooks/useDebounce";
import { News } from "@/type/news";
import Image from "next/image";

const SearchNewsModal = Modal;

const Navigation = () => {
  const [isOpenSearchNewsModal, setIsOpenSearchNewsModal] = useState(false);
  const [newsSearch, setNewsSearch] = useState("");
  const [searchResult, setSearchResult] = useState<News[]>([]);
  const [isMac, setIsMac] = useState(false);

  const debouncedSearch = useDebounce(newsSearch, 500);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/Mac/.test(navigator.platform));
    }
  }, []);

  const modKey = isMac ? "⌘" : "Ctrl";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModKeyPressed = isMac ? event.metaKey : event.ctrlKey;

      if (event.key.toLowerCase() === "k" && isModKeyPressed) {
        event.preventDefault();
        setIsOpenSearchNewsModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMac]);

  useEffect(() => {
    if (debouncedSearch) {
      searchNews(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (newsSearch === "") {
      setSearchResult([]);
    }
  }, [newsSearch]);

  useEffect(() => {
    if (isOpenSearchNewsModal) {
      setNewsSearch("");
      setSearchResult([]);
    }
  }, [isOpenSearchNewsModal]);

  if (!pathname || pathname === "/") {
    return null;
  }

  const searchNews = async (query: string) => {
    const res = await fetch(`/proxy/news/v2/search?search=${query}`);
    if (!res.ok) setSearchResult([]);

    const json = await res.json();
    setSearchResult(json.data);
  };

  return (
    <>
      <nav className="flex items-center gap-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Link
          href="/news"
          className={clsx(
            pathname.startsWith("/news")
              ? "text-black font-semibold"
              : "text-sub"
          )}
        >
          뉴스
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

        <button
          className="text-sub flex items-center gap-main bg-main-light-gray/70 rounded-main px-2 py-1 "
          onClick={() => setIsOpenSearchNewsModal(true)}
        >
          <input
            placeholder="뉴스 검색"
            type="text"
            className="text-sm pointer-events-none w-20"
          />

          <div className="flex items-center gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded border-[0.5px] border-main-dark-gray/70 text-xs font-mono flex items-center justify-center">
              <span className="text-main-dark-gray/70">{modKey}</span>
            </kbd>
            <span className="text-main-dark-gray/70">+</span>
            <kbd className="px-1.5 py-0.5 rounded border-[0.5px] border-main-dark-gray/70 text-xs font-mono flex items-center justify-center">
              <span className="text-main-dark-gray/70">K</span>
            </kbd>
          </div>
          <SearchIcon className="size-4" />
        </button>
      </nav>

      <SearchNewsModal
        isOpen={isOpenSearchNewsModal}
        onClose={() => setIsOpenSearchNewsModal(false)}
        isEscapeClose
      >
        <div className="flex flex-col gap-main">
          <h2 className="text-lg font-semibold">뉴스 검색</h2>

          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              placeholder="뉴스 검색"
              className="w-full outline-none border border-main-dark-gray/30 rounded-main px-main py-1"
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
            />
            <Search
              className="absolute right-main top-1/2 -translate-y-1/2 text-main-dark-gray"
              size={16}
            />
          </div>

          {searchResult && (
            <div className="grid grid-cols-[250px_250px] gap-main">
              {searchResult.length > 0 && (
                <span className="col-span-2 text-sm text-main-dark-gray text-center">
                  최대 10개의 결과만 표시됩니다.
                </span>
              )}
              {searchResult.map((news) => (
                <Link
                  href={`/news/${news.newsId}`}
                  className="flex gap-main hover:bg-main-blue/10 transition-colors duration-300 ease-in-out rounded-main p-main group"
                  key={`main-news-${news.newsId}`}
                >
                  <div className="size-[60px] rounded-main shrink-0 relative">
                    <Image
                      src={news.image || "https://placehold.co/90x90"}
                      alt={`${news.title}-image`}
                      fill
                      className="object-cover rounded-main group-hover:scale-102 duration-300 ease-in-out"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-around">
                    <p className="line-clamp-2 font-semibold">{news.title}</p>
                    <div className="flex items-center text-main-dark-gray text-xs">
                      <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                      <span className="text-main-dark-gray">
                        {news.wdate &&
                          new Date(news.wdate).toLocaleDateString()}{" "}
                        · {news.press}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchResult && searchResult.length === 0 && (
            <div className="flex flex-col gap-main">
              <p className="text-sm text-main-dark-gray my-10 text-center">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </SearchNewsModal>
    </>
  );
};

export default Navigation;
