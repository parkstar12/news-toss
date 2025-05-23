import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "주식 투자에 설명력을 더해주는 AI 애널리스트 회원가입 페이지",
};

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignupLayout;
