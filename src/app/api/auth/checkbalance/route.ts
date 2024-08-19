import User from "@/models/User";
import connect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const accountNo = searchParams.get("accountNo");

    if (!accountNo) {
      throw new Error("Account number is required");
    }

    // Find the user by account number
    const user = await User.findOne({ accountNo });

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json(
      { success: true, message: "Successfully checked current balance", data: user.balance },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Unable to check balance" }, { status: 500 });
  }
}
