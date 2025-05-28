"use client";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/shared/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SearchStockProps {
  onSelect?: (stock: { code: string; name: string }) => void;
}

const SearchStock = ({ onSelect }: SearchStockProps) => {
  const [stockSearch, setStockSearch] = useState("");
  const debouncedSearch = useDebounce(stockSearch, 500);
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    if (debouncedSearch) {
      searchStocks(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (stockSearch === "") {
      setSearchResult([]);
    }
  }, [stockSearch]);

  const searchStocks = async (query: string) => {
    // API 호출 등 검색 로직
    // 예시: [{ code: "005930", name: "삼성전자" }, ...]
    setSearchResult([
      { code: "005930", name: "삼성전자" },
      { code: "003490", name: "포스코홀딩스" },
      { code: query, name: `검색결과: ${query}` },
    ]);
  };
  return (
    <>
      <button
        className="w-fit flex items-center gap-[5px] bg-main-blue/10 text-main-blue rounded-main px-3 py-1 hover:bg-main-blue/20 transition-colors duration-200 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        <Search size={16} />
        <span>종목 검색</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setStockSearch("");
          setSearchResult([]);
        }}
        hasCloseButton={false}
      >
        <div className="w-[500px] flex flex-col gap-main">
          <div className="w-full shadow-color rounded-main relative">
            <Input
              ref={(el) => {
                if (el && isOpen) {
                  el.focus();
                }
              }}
              value={stockSearch}
              onChange={(e) => setStockSearch(e.target.value)}
              placeholder="종목명 또는 코드 검색"
              width={400}
              onClick={() => setIsOpen(true)}
            />
            <Search className="absolute right-main top-[50%] translate-y-[-50%]" />
          </div>

          {stockSearch && searchResult.length === 0 ? (
            <div className="w-full h-[200px] flex items-center justify-center">
              <p className="text-main-dark-gray">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <>
              {searchResult.map((result, idx) => (
                <div
                  className="w-full flex flex-col justify-around hover:bg-main-blue/10 rounded-main transition-colors duration-200 ease-in-out p-main gap-[5px] group relative"
                  key={`search-stock-${result.code}-${idx}`}
                  onClick={() => {
                    setIsOpen(false);
                    setStockSearch("");
                    setSearchResult([]);
                    if (onSelect) onSelect(result);
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="bg-black rounded-full size-[40px] shrink-0" />
                    <div className="flex flex-col flex-1 truncate text-sm">
                      <span className="font-bold text-gray-800 truncate w-full">
                        {result.name}
                      </span>
                      <span className="text-main-dark-gray">{result.code}</span>
                    </div>
                  </div>
                  <button className="absolute top-1/2 -translate-y-1/2 right-main hidden group-hover:block">
                    <Plus
                      className="text-main-blue hover:bg-main-blue/30 rounded-full p-1 box-content transition-colors duration-200 ease-in-out"
                      size={20}
                    />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SearchStock;
