"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getJwtToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded: {
      sub: string;
      memberId: string;
      memberName: string;
      iat: number;
      exp: number;
    } = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
}
