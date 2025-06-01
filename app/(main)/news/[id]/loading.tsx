import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <LoaderCircle className="text-main-blue animate-spin" size={40} />
    </div>
  );
};

export default loading;
