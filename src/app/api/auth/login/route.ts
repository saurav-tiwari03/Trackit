import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const { accountNo,email, password } = reqData;

    const user = await User.findOne({$or : [{accountNo},{email}]});
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    user.password = null;
    return NextResponse.json({ success: true, data: user, message: "Login successful" }, { status: 200 });
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
