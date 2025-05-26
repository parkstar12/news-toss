"use client";

import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import newsTossLogo from "@/public/news-toss-logo.png";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import clsx from "clsx";

export interface UserInfo {
  name: string;
  address: {
    zipCode: string;
    address: string;
    addressDetail: string;
  };
  phone: {
    countryCode: string;
    phoneNumber1: string;
    phoneNumber2: string;
  };
  email: string;
  id: string;
  password: string;
  passwordConfirm: string;
  agree: boolean;
}

const SignUpPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    address: {
      zipCode: "",
      address: "",
      addressDetail: "",
    },
    phone: {
      countryCode: "",
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
          router.push("/home");
        }}
        hasBackdropBlur={false}
        isClickOutsideClose={false}
        // hasCloseButton={false}
      >
        <div className="flex items-center w-full gap-[40px]">
          <div className="flex flex-col gap-[40px] items-center">
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
              <p className="text-sm text-main-dark-gray break-keep">
                과거 유사 사건 뉴스 및 증권사 리포트 기반 주식 투자 판단 보조
                시스템
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-main overflow-y-scroll">
            <h2 className="text-lg font-bold text-main-dark-gray">
              회원가입 {step}/2
            </h2>
            <div className="relative w-[500px] h-[500px] overflow-hidden">
              <div
                className={clsx(
                  "absolute top-0 left-0 w-full h-full transition-transform duration-500 p-main",
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
