import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number | string;
  height?: number | string;
}

function getWidthStyle(width?: number | string) {
  if (typeof width === "number") return `w-[${width}px]`;
  if (width === "full") return "w-full";
  if (typeof width === "string") return width;
  return "";
}

function getHeightStyle(height?: number | string) {
  if (typeof height === "number") return `h-[${height}px]`;
  if (height === "full") return "h-full";
  if (typeof height === "string") return height;
  return "";
}

const Input: React.FC<InputProps> = ({
  width = 200,
  height = 40,
  className,
  ...rest
}) => {
  return (
    <input
      className={clsx(
        getWidthStyle(width),
        getHeightStyle(height),
        "p-main bg-transparent border border-main-light-gray rounded-[10px] focus:border-main-blue",
        className
      )}
      {...rest}
    />
  );
};

export default Input;
