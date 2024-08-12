import connect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const tokenFromUrl = searchParams.get('token');
    const { token } = reqData;

    console.log('Token from Params : ', tokenFromUrl);
    console.log('Token from user : ', token);

    if (!tokenFromUrl || !token) {
      throw new Error("Token not found");
    }

    const check = tokenFromUrl === token;

    if (!check) {
      throw new Error("Invalid token");
    }

    return NextResponse.json({ success: true, message: "Your account is verified now" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
