"use client";

import React, { useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ account, password }),
    });

    if (res.ok) {
      toast.success("로그인에 성공했습니다");
      router.refresh();
    } else {
      toast.error("로그인에 실패했습니다");
    }
  };

  return (
    <form
      className="w-[300px] bg-white rounded-main shadow-color p-[20px] flex flex-col gap-main items-center"
      onSubmit={handleSubmit}
    >
      <Input
        id="account"
        type="text"
        placeholder="아이디"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hasShowButton={true}
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
