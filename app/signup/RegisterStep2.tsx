"use client";

import Input from "@/components/ui/shared/Input";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { UserInfo } from "@/type/userInfo";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  useEffect(() => {
    if (!userInfo.password) return;

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
    <div className="flex flex-col gap-main size-full justify-between">
      <div className="flex flex-col gap-main">
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="userId">아이디</label>
          <div className="flex gap-main">
            <Input
              placeholder="아이디"
              value={userInfo.id}
              onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
            />
            <button
              className="bg-main-blue text-white rounded-main w-fit shrink-0 px-4 py-2 text-sm"
              // onClick={() => setIsOpenAddressModal(true)}
            >
              중복 확인
            </button>
          </div>
          <span className="text-sm text-main-blue ml-main">
            사용가능한 아이디입니다
          </span>
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
          <span className="text-sm text-main-dark-gray">
            비밀번호 강도: {passwordStrengthText} (영문, 숫자, 특수문자 조합
            8~20자)
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
          {/* <span className="text-sm text-main-dark-gray"></span> */}
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
        <div className="flex gap-main items-baseline">
          <input
            type="checkbox"
            id="agree"
            checked={userInfo.agree}
            onChange={(e) =>
              setUserInfo({ ...userInfo, agree: e.target.checked })
            }
          />
          <label htmlFor="agree">
            <p>이용약관 및 개인정보 처리방침에 동의합니다</p>
            <p>서비스 이용을 위해 필수 약관에 동의해주세요</p>
          </label>
        </div>
      </div>

      <div className="flex gap-main self-end">
        <button
          className="bg-main-blue/20 text-main-blue px-4 py-2 rounded-main text-sm w-fit"
          onClick={() => setStep(1)}
        >
          이전
        </button>
        <button
          className="bg-main-blue text-white px-4 py-2 rounded-main text-sm w-fit"
          // 실제 회원가입 처리 로직 필요
          disabled={
            !userInfo.id ||
            !userInfo.password ||
            !userInfo.passwordConfirm ||
            !userInfo.agree
          }
          onClick={() => {
            console.log(userInfo);
            router.push("/home");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default RegisterStep2;
