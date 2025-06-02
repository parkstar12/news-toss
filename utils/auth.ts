"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { JwtToken } from "@/type/jwt";

export async function getJwtToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded: JwtToken = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
}
