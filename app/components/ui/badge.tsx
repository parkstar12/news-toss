import React from "react";

export function Badge({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
