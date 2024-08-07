import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from 'otp-generator'
connect();

export async function POST (req:NextRequest) {
  function generateOtp() {
    return otpGenerator.generate(4, { upperCaseAlphabets: false,lowerCaseAlphabets :false, specialChars: false });
  }
  try {
    const reqData = await req.json();
    const { email } = reqData;
    if (!reqData) {
      return NextResponse.json({ success: false, message: 'Request body is empty or invalid' });
    }
    const user = await User.findOne({ email })
    if(!user) {
      return NextResponse.json({ success: false, message: 'User not found' })
    }
    const otp = generateOtp();
    user.otp = otp;
    await user.save();
    return NextResponse.json({success:true,otp:otp,message:"Otp sent successfully"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: 'Unable to generate OTP' })
  }
}

export async function GET (req:NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const otp = searchParams.get('otp');
    const email = searchParams.get('email');
    const user = await User.findOne({ email});
    if(!user) {
      return NextResponse.json({ success: false, message: 'Server error please try after sometime' })
    }
    console.log(user.otp);
    if(user.otp == otp) {
      return NextResponse.json({ success: true, message: 'OTP validated successfully' })
    } else {
      return NextResponse.json({ success: false, message: 'Invalid OTP' })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: 'Error while processing otp' })
  }
}