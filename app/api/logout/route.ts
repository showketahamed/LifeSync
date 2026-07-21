import { NextResponse } from "next/server";

const sessionCookies = ["authjs.session-token", "__Secure-authjs.session-token", "next-auth.session-token", "__Secure-next-auth.session-token"];

export async function POST() {
  const response = NextResponse.json({ success: true });
  for (const name of sessionCookies) {
    response.cookies.set({ name, value: "", expires: new Date(0), path: "/", httpOnly: true, sameSite: "lax", secure: name.startsWith("__Secure-") });
  }
  return response;
}
