"use client";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/shared/Input";
import { Edit } from "lucide-react";
import React, { useState } from "react";

const EditInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: {
      zipcode: "",
      address: "",
      detail: "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(info);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Edit className="text-main-dark-gray" size={15} />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isClickOutsideClose={false}
      >
        <form className="flex flex-col gap-main" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold">내 정보 수정</h2>

          <div className="flex flex-col gap-[5px]">
            <label htmlFor="name">이름</label>
            <Input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="phone">휴대폰번호</label>
            <Input
              type="text"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="address">집주소</label>
            <div className="flex gap-main">
              <Input
                type="text"
                value={info.address.zipcode}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    address: { ...info.address, zipcode: e.target.value },
                  })
                }
              />
              <button className="w-full bg-main-blue text-white rounded-main px-[20px] py-main">
                주소 찾기
              </button>
            </div>
            <Input
              type="text"
              value={info.address.address}
              onChange={(e) =>
                setInfo({
                  ...info,
                  address: { ...info.address, address: e.target.value },
                })
              }
            />
            <Input
              type="text"
              value={info.address.detail}
              onChange={(e) =>
                setInfo({
                  ...info,
                  address: { ...info.address, detail: e.target.value },
                })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-main-blue text-white rounded-main px-[20px] py-main"
          >
            수정하기
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditInfo;
