import User from "@/models/User";
import connect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/config/nodemailer";

connect();

type Props = {
  to: string,
  subject: string,
  html: string
}
export async function POST(req:NextRequest) {
  try {
    const reqData = await req.json();
    const {amount,from,to} = reqData;
    console.log(reqData)
    if (!amount ||!from ||!to) {
      throw new Error("Missing required fields");
    }
    const userFrom = await User.findOne({accountNo:from});
    const userTo = await User.findOne({accountNo:to});

    if (!userFrom ||!userTo) {
      throw new Error("User not found");
    }

    const props:Props = {
      to:userTo.email,
      subject:`Money request on Trackit`,
      html:`
      <h1>Hello! ${userTo.name}</h1>
      <p>${userFrom.name} is request ${amount} INR on Trackit, below is the link for approving request</p>
      <a href='${process.env.NEXT_PUBLIC_REQUEST_REDIRECT}'>Click here</a>
      `
    }
    await sendMail(props);
    console.log(props.subject);
    return NextResponse.json({success: true,message:"Mail sent successfully"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: 'Unable to send mail for money request' })
  }
}