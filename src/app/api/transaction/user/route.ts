import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const accountNo = searchParams.get("id");
    if (!accountNo) {
      throw new Error('Account not found');
    }
    const user = await User.findOne({accountNo});
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Transaction fetched", data: user.transactions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Unable to fetch transaction" }, { status: 500 });
  }
}
