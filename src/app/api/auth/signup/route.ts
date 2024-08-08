import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { sendMail } from "@/config/nodemailer";

connect();

type Props = {
  to: string,
  subject: string,
  html: string
}

export async function POST (req:NextRequest) {
  function accountNumberGenerator (){
    const randomNumber = Math.floor(Math.random() * 10000);
    return `60${randomNumber}`;
  }
  try {
    const reqData = await req.json();
    const {name,email,role,password,balance} = reqData;
    const accountNo = accountNumberGenerator();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name,accountNo,role,email,password:hashedPassword,balance});
    user.password = null;

    const props:Props = {
      to:user.email,
      subject:"Trackit signup completed successfully",
      html:`
        <h1>Hello! ${user.name}</h1>
        <p>Below are the details of your account</p>
        <p>Your account number is: ${user.accountNo}</p>
        <p>Your current balance is: ${user.balance}</p>
      `
    }

    await sendMail(props)

    return NextResponse.json({success: true,data: user,message:"User created successfully"},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({success:false, message: "Invalid request data" },{status:500});
  }
}