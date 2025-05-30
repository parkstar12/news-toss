"use client";

import React, { useRef, useState } from "react";
import EditInfo from "./EditInfo";
import useOutsideClick from "@/hooks/useOutsideClick";
import useTokenExpire from "@/hooks/useTokenExpire";
import { JwtToken } from "@/type/jwt";
import clsx from "clsx";

const UserInfo = ({
  token,
  children,
}: {
  token: JwtToken;
  children: React.ReactNode;
}) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const loginFormRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(loginFormRef, () => {
    setIsOpenForm(false);
  });

  return (
    <>
      <div className="flex items-center gap-main">
        <button
          className="text-main-dark-gray"
          onClick={() => setIsOpenForm(!isOpenForm)}
        >
          <b className="underline">{token.memberName}</b> 님
        </button>
        <span>세션: {useTokenExpire(token.exp)}</span>
      </div>

      <div
        ref={loginFormRef}
        className={clsx(
          "absolute right-0 pt-2 duration-200 z-50",
          isOpenForm ? "block" : "hidden"
        )}
      >
        <div className="bg-white w-[350px] rounded-main shadow-color p-[20px] flex flex-col gap-main">
          <div className="flex items-center gap-main">
            <h2 className="text-main-dark-gray font-bold text-xl">내 정보</h2>
            <EditInfo />
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-y-main gap-x-[20px]">
            <span>이름</span>
            <span>{token.memberName}</span>

            <span>휴대폰</span>
            <span>010-1234-1234</span>

            <span>이메일</span>
            <span>test@test.com</span>

            <span>집주소</span>
            <span>서울 강남구 역삼동 123-123</span>
          </div>

          {children}
          {/* <button className="text-xs">탈퇴하기</button> */}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
