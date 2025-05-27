"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasShowButton?: boolean;
}

const Input = ({ className, hasShowButton = false, ...rest }: InputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative w-full">
      {hasShowButton && (
        <button
          className="absolute right-main top-1/2 -translate-y-1/2 text-gray-200"
          onClick={handleShowPassword}
        >
          {isShowPassword ? <Eye /> : <EyeOff />}
        </button>
      )}
      <input
        {...rest}
        type={
          hasShowButton ? (isShowPassword ? "text" : "password") : rest.type
        }
        className={clsx(
          "w-full p-main bg-transparent border border-main-light-gray rounded-main focus:border-main-blue/50 outline-none",
          // "focus:shadow-[0_0_0_4px_rgba(52,133,250,0.3)]",
          className
        )}
      />
    </div>
  );
};

export default Input;
