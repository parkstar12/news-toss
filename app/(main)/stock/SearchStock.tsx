"use client";

import Input from "@/components/ui/shared/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchStock = () => {
  const [stockSearch, setStockSearch] = useState("");
  const debouncedSearch = useDebounce(stockSearch, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchStocks(debouncedSearch);
    }
  }, [debouncedSearch]);

  console.log(debouncedSearch);

  const searchStocks = async (query: string) => {
    // API 호출 등 검색 로직
    console.log("Searching for:", query);
  };
  return (
    <div className="w-full shadow-color rounded-main relative">
      <Input
        value={stockSearch}
        onChange={(e) => setStockSearch(e.target.value)}
        placeholder="종목명 또는 코드 검색"
        width="full"
      />
      <Search className="absolute right-main top-[50%] translate-y-[-50%]" />
      {debouncedSearch && (
        <div className="w-full absolute left-0 pt-main">
          <div className=" bg-main-blue rounded-main"></div>
        </div>
      )}
    </div>
  );
};

export default SearchStock;
