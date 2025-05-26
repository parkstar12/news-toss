"use client";

import Input from "@/components/ui/shared/Input";
import React, { useEffect, useState } from "react";
import { UserInfo } from "./page";
import clsx from "clsx";

interface RegisterStep2Props {
  setStep: (step: number) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const RegisterStep2 = ({
  setStep,
  userInfo,
  setUserInfo,
}: RegisterStep2Props) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("매우약함");

  useEffect(() => {
    // 점수 누적 변수
    let score = 0;
    // 길이 검사
    if (userInfo.password.length >= 8) score += 1;
    // 영문자 포함 (대문자 또는 소문자)
    if (/[A-Za-z]/.test(userInfo.password)) score += 1;
    // 숫자 포함
    if (/[0-9]/.test(userInfo.password)) score += 1;
    // 특수문자 포함
    if (/[^A-Za-z0-9]/.test(userInfo.password)) score += 1;
    setPasswordStrength(score);

    switch (score) {
      case 1:
        setPasswordStrengthText("약함");
        break;
      case 2:
        setPasswordStrengthText("보통");
        break;
      case 3:
        setPasswordStrengthText("강함");
        break;
      case 4:
        setPasswordStrengthText("매우강함");
        break;
    }
  }, [userInfo.password]);

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="userId">아이디</label>
        <Input
          placeholder="아이디"
          value={userInfo.id}
          onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="password">비밀번호</label>
        <Input
          placeholder="비밀번호"
          type="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <span>영문, 숫자, 특수문자 조합 8~20자</span>
        <span className="text-sm text-main-dark-gray">
          비밀번호 강도: {passwordStrengthText}
        </span>
        <div className="flex gap-main">
          <div
            className={clsx(
              "w-full h-[5px] rounded-full",
              passwordStrength >= 1 ? "bg-main-blue" : "bg-main-light-gray"
            )}
          />
          <div
            className={clsx(
              "w-full h-[5px] rounded-full",
              passwordStrength >= 2 ? "bg-main-blue" : "bg-main-light-gray"
            )}
          />
          <div
            className={clsx(
              "w-full h-[5px] rounded-full",
              passwordStrength >= 3 ? "bg-main-blue" : "bg-main-light-gray"
            )}
          />
          <div
            className={clsx(
              "w-full h-[5px] rounded-full",
              passwordStrength >= 4 ? "bg-main-blue" : "bg-main-light-gray"
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <Input
          placeholder="비밀번호 확인"
          type="password"
          value={userInfo.passwordConfirm}
          onChange={(e) =>
            setUserInfo({ ...userInfo, passwordConfirm: e.target.value })
          }
        />
      </div>
      <div className="flex gap-main items-start">
        <input
          type="checkbox"
          id="agree"
          checked={userInfo.agree}
          onChange={(e) =>
            setUserInfo({ ...userInfo, agree: e.target.checked })
          }
        />
        <label htmlFor="agree">
          이용약관 및 개인정보 처리방침에 동의합니다
          <br />
          서비스 이용을 위해 필수 약관에 동의해주세요
        </label>
      </div>
      <button
        className="bg-main-blue text-white px-4 py-2 rounded-main text-sm"
        // 실제 회원가입 처리 로직 필요
        disabled={
          !userInfo.id ||
          !userInfo.password ||
          !userInfo.passwordConfirm ||
          !userInfo.agree
        }
      >
        회원가입
      </button>
    </>
  );
};

export default RegisterStep2;
