"use client";

import Modal from "@/components/ui/Modal";
import React, { useState } from "react";

const Withdraw = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>회원탈퇴</button>
      <Modal
        hasBackdropBlur={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hasCloseButton={false}
        isClickOutsideClose={false}
      >
        <div className="flex flex-col gap-[20px]">
          <span className="text-lg font-semibold">
            정말 회원탈퇴 하시겠습니까?
          </span>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-main-blue/20 text-main-blue rounded-main px-[20px] py-main"
              onClick={() => setIsOpen(false)}
            >
              취소
            </button>
            <button
              className="bg-main-blue text-white rounded-main px-[20px] py-main"
              onClick={() => {
                // 회원탈퇴 로직
                setIsOpen(false);
              }}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Withdraw;
