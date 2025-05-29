import { Heart } from "lucide-react";
import React from "react";

const Scrab = ({
  className,
  stockCode,
}: {
  className?: string;
  stockCode: string;
}) => {
  return (
    <button className={className}>
      <Heart className="text-transparent" size={18} fill="#3485fa" />
    </button>
  );
};

export default Scrab;
