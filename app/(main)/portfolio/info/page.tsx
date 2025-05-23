import React from "react";
import Withdraw from "./Withdraw";
import EditInfo from "./EditInfo";

const InfoPortfolioPage = () => {
  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div className="flex flex-col gap-main">
        <div className="flex items-center gap-main">
          <h2 className="text-main-dark-gray font-bold text-xl">내 정보</h2>
          <EditInfo />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="py-2 pr-[20px] font-semibold text-main-dark-gray">
                이름
              </td>
              <td className="py-2">홍길동</td>
            </tr>
            <tr>
              <td className="py-2 pr-[20px] font-semibold text-main-dark-gray">
                휴대폰번호
              </td>
              <td className="py-2">010-1234-1234</td>
            </tr>
            <tr>
              <td className="py-2 pr-[20px] font-semibold text-main-dark-gray">
                이메일
              </td>
              <td className="py-2">test@test.com</td>
            </tr>
            <tr>
              <td className="py-2 pr-[20px] font-semibold text-main-dark-gray">
                집주소
              </td>
              <td className="py-2">서울 강남구 역삼동 123-123</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-main">
        <h2 className="text-main-dark-gray font-bold text-xl">계정 관리</h2>
        <div className="flex flex-col gap-2 w-fit">
          <button>로그아웃</button>
          <Withdraw />
        </div>
      </div>
    </div>
  );
};

export default InfoPortfolioPage;
