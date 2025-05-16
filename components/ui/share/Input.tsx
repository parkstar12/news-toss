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
      className={`block w-[${width}px] h-[${height}px] px-3 py-2 bg-transparent border-2 border-main-gray rounded-[10px] text-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer`}
    />
  );
};

export default Input;
