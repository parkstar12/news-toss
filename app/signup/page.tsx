"use client";

import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import newsTossLogo from "@/public/news-toss-logo.png";
import RegisterStep1 from "@/components/router/siginup/RegisterStep1";
import RegisterStep2 from "@/components/router/siginup/RegisterStep2";
import clsx from "clsx";
import { UserInfo } from "@/type/userInfo";

const SignUpPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    address: {
      zipcode: "",
      address: "",
      detail: "",
    },
    phone: {
      countryCode: "010",
      phoneNumber1: "",
      phoneNumber2: "",
    },
    email: "",
    id: "",
    password: "",
    passwordConfirm: "",
    agree: false,
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          router.push("/news");
        }}
        hasBackdropBlur={false}
        isClickOutsideClose={false}
        // hasCloseButton={false}
      >
        <div className="grid grid-cols-[auto_1fr] gap-[40px]">
          <div className="flex flex-col gap-[40px] items-center justify-center px-[40px]">
            <div className="relative size-[200px]">
              <Image
                src={newsTossLogo}
                alt="news-toss-logo"
                fill
                className="rounded-full"
              />
            </div>
            <div className="text-center flex flex-col gap-main">
              <p className="text-lg font-bold text-main-dark-gray">
                실시간 주식 투자 AI 애널리스트
              </p>
              <p className="text-sm text-main-dark-gray break-keep flex flex-col">
                <span>과거 유사 사건 뉴스 및 증권사 리포트 기반</span>
                <span>주식 투자 판단 보조시스템</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-main overflow-y-scroll">
            <h2 className="text-lg font-bold text-main-dark-gray">
              회원가입 {step}/2
            </h2>
            <div className="relative min-w-[400px] min-h-[500px]">
              <div
                className={clsx(
                  "absolute top-0 left-0 w-full h-full transition-transform duration-500",
                  step === 1 ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ zIndex: step === 1 ? 2 : 1 }}
              >
                <RegisterStep1
                  setStep={setStep}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              </div>
              <div
                className={clsx(
                  "absolute top-0 left-0 w-full h-full transition-transform duration-500",
                  step === 2 ? "translate-x-0" : "translate-x-full"
                )}
                style={{ zIndex: step === 2 ? 2 : 1 }}
              >
                <RegisterStep2
                  setStep={setStep}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpPage;
