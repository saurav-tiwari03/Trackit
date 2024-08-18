import User from "@/models/User";
import connect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const { accountNo } = reqData;
    if (!accountNo) {
      throw new Error("Account number is required");
    }
    const user = await User.findOne({ accountNo }); 
    if(!user) {
      throw new Error("User with this account number not found");
    }
    return NextResponse.json({exist:true})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ exist: false, message: error.message }) 
  }
}