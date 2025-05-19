import React from "react";

interface FloatingLabelInputProps {
  width?: number;
  height?: number;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<FloatingLabelInputProps> = ({
  width = 200,
  height = 40,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-[${width}px] h-[${height}px] p-main bg-transparent border border-main-light-gray rounded-[10px] focus:border-main-blue`}
    />
  );
};

export default Input;
