import React from "react";
import EditInfo from "./EditInfo";

const UserInfo = () => {
  return (
    <div className="bg-white w-[350px] rounded-main shadow-color p-[20px] flex flex-col gap-main">
      <div className="flex items-center gap-main">
        <h2 className="text-main-dark-gray font-bold text-xl">내 정보</h2>
        <EditInfo />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-y-main gap-x-[20px]">
        <span>이름</span>
        <span>홍길동</span>

        <span>휴대폰</span>
        <span>010-1234-1234</span>

        <span>이메일</span>
        <span>test@test.com</span>

        <span>집주소</span>
        <span>서울 강남구 역삼동 123-123</span>
      </div>
      {/* <table>
          <tbody>
            <tr>
              <td className="py-1 pr-main font-semibold text-main-dark-gray">
                이름
              </td>
              <td className="py-1">홍길동</td>
            </tr>
            <tr>
              <td className="py-1 pr-main font-semibold text-main-dark-gray">
                휴대폰
              </td>
              <td className="py-1">010-1234-1234</td>
            </tr>
            <tr>
              <td className="py-1 pr-main font-semibold text-main-dark-gray">
                이메일
              </td>
              <td className="py-1">test@test.com</td>
            </tr>
            <tr>
              <td className="py-1 pr-main font-semibold text-main-dark-gray shrink-0">
                집주소
              </td>
              <td className="py-1 line-clamp-2">
                서울 강남구 역삼동 123-123adsfasdfsadfasdfasdf
              </td>
            </tr>
          </tbody>
        </table> */}

      <button
        type="submit"
        className="w-full bg-main-blue text-white px-4 rounded-[10px] py-[5px]"
      >
        로그아웃
      </button>
      <button className="text-xs">탈퇴하기</button>
    </div>
  );
};

export default UserInfo;
