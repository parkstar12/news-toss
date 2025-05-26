"use client";

import Input from "@/components/ui/shared/Input";
import React, { useState } from "react";
import { UserInfo } from "./page";
import DaumPostcode from "react-daum-postcode";
import Modal from "@/components/ui/Modal";

const AddressModal = Modal;

interface RegisterStep1Props {
  setStep: (step: number) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const themeObj = {
  bgColor: "", // 바탕 배경색
  searchBgColor: "", // 검색창 배경색
  contentBgColor: "", // 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
  pageBgColor: "", // 페이지 배경색
  textColor: "", // 기본 글자색
  queryTextColor: "", // 검색창 글자색
  postcodeTextColor: "#3485fa", // 우편번호 글자색
  emphTextColor: "#3485fa", // 강조 글자색
  outlineColor: "", // 테두리
};

const RegisterStep1 = ({
  setStep,
  userInfo,
  setUserInfo,
}: RegisterStep1Props) => {
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);

  const handleAddressComplete = (data: {
    zipCode: string;
    address: string;
  }) => {
    setIsOpenAddressModal(false);
    setUserInfo({
      ...userInfo,
      address: {
        zipCode: data.zipCode,
        address: data.address,
        addressDetail: "",
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="name">이름</label>
        <Input
          width="full"
          placeholder="이름"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="address">주소</label>
        <div className="flex gap-main">
          <Input
            placeholder="우편번호"
            disabled
            value={userInfo.address.zipCode}
          />
          <button
            className="bg-main-blue text-white px-4 py-2 rounded-main text-sm w-full"
            onClick={() => setIsOpenAddressModal(true)}
          >
            주소 찾기
          </button>
        </div>
        <Input placeholder="주소" disabled value={userInfo.address.address} />
        <Input
          placeholder="상세 주소"
          value={userInfo.address.addressDetail}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              address: { ...userInfo.address, addressDetail: e.target.value },
            })
          }
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="phone">전화번호</label>
        <div className="flex gap-main items-center">
          <select>
            <option value="1">010</option>
            <option value="2">011</option>
            <option value="3">016</option>
            <option value="4">017</option>
            <option value="5">018</option>
            <option value="6">019</option>
          </select>
          <span>-</span>
          <Input
            value={userInfo.phone.phoneNumber1}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                phone: { ...userInfo.phone, phoneNumber1: e.target.value },
              })
            }
          />
          <span>-</span>
          <Input
            value={userInfo.phone.phoneNumber2}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                phone: { ...userInfo.phone, phoneNumber2: e.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="email">이메일</label>
        <Input
          placeholder="이메일"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>
      <button
        className="bg-main-blue text-white px-4 py-2 rounded-main text-sm"
        onClick={() => setStep(2)}
      >
        다음
      </button>

      <AddressModal
        isOpen={isOpenAddressModal}
        onClose={() => {
          setIsOpenAddressModal(false);
          // handleAddressComplete();
        }}
        hasCloseButton={false}
      >
        <DaumPostcode
          onComplete={(data) =>
            handleAddressComplete({
              zipCode: data.zonecode,
              address: data.address,
            })
          }
          style={{ width: "400px", height: "500px" }}
          theme={themeObj}
        />
        {/* <button
          className="w-full bg-main-blue text-white px-4 py-2 rounded-main text-sm"
          onClick={() => setIsOpenAddressModal(false)}
        >
          주소 선택
        </button> */}
      </AddressModal>
    </>
  );
};

export default RegisterStep1;
