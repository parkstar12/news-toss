"use client";
import React from "react";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";

const LogoutForm = ({ action }: { action: (formData: FormData) => void }) => {
  const { pending } = useFormStatus();

  const handleLogout = async (formData: FormData) => {
    action(formData);
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      toast.success("로그아웃 되었습니다");
    } else {
      toast.error("로그아웃에 실패했습니다");
    }
  };

  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className="w-full bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
        disabled={pending}
      >
        로그아웃
      </button>
    </form>
  );
};

export default LogoutForm;
