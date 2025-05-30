import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (response.ok) {
    return res.status(200).json({ message: "로그아웃 되었습니다" });
  } else {
    return res.status(500).json({ message: "로그아웃 실패" });
  }
}
