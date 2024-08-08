import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/config/nodemailer";

connect();

type Props = {
  to: string,
  subject: string,
  html: string
}

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

    const props:Props = {
      to:user.email,
      subject:"Login successfully",
      html:`
        <h1>Hello ${user.name}</h1>
        <p>You successfully logged in your account</p>
      `
    }

    await sendMail(props)

    user.password = undefined;
    user.otp = undefined;
    user.role = undefined;
    user.accountVerified = undefined;
    return NextResponse.json({ success: true, data: user, message: "Login successful" }, { status: 200 });
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
