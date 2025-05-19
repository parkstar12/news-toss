"use client";

import React, { useState } from "react";
import Input from "./Input";
import Link from "next/link";

const LoginForm = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(account, password);
  };

  return (
    <form
      className="bg-white rounded-[10px] shadow-color p-[20px] flex flex-col gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="계정"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
      >
        로그인
      </button>
      <Link href="/signup" className="text-xs">
        회원가입
      </Link>
    </form>
  );
};

export default LoginForm;
