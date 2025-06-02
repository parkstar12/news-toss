import { JwtToken } from "@/type/jwt";
import clsx from "clsx";
import { Heart } from "lucide-react";
import React from "react";

const Scrab = ({
  type,
  className,
  stockCode,
  fill,
  token,
  onClick,
}: {
  type: "news" | "stock";
  className?: string;
  stockCode: string;
  fill?: boolean;
  token: JwtToken | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 absolute bottom-0 left-0 rounded-bl-main border-main-blue/20 border-[20px] border-t-transparent border-r-transparent z-10">
      <button
        className={clsx(className, "absolute -bottom-[16px] -left-[18px]")}
        onClick={onClick}
      >
        <Heart
          className="text-main-blue hover:scale-110 transition-all duration-300"
          size={18}
          fill={fill ? "#3485fa" : "transparent"}
        />
      </button>
    </div>
  );
};

export default Scrab;
