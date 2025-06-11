"use client";

import { JwtToken } from "@/type/jwt";
import React from "react";
import InterestStocks from "./InterestStocks";
import ScrapNews from "./ScrapNews";

const Interest = ({ token }: { token: JwtToken | null }) => {
  return (
    <>
      <div className="grid grid-rows-2 gap-main size-full">
        <InterestStocks token={token} />

        <ScrapNews token={token} />
      </div>
    </>
  );
};

export default Interest;
