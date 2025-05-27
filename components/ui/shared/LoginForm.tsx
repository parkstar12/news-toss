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
      className="w-[300px] bg-white rounded-main shadow-color p-[20px] flex flex-col gap-main items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        {/* <label htmlFor="account" className="text-sm">
          아이디
        </label> */}
        <Input
          id="account"
          type="text"
          placeholder="아이디"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>

      <div className="w-full">
        {/* <label htmlFor="password" className="text-sm">
          비밀번호
        </label> */}
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasShowButton={true}
        />
      </div>
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
