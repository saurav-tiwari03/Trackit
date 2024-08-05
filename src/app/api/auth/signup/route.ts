import connect from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

connect();

export async function POST (req:NextRequest) {
  function accountNumberGenerator (){
    const randomNumber = Math.floor(Math.random() * 10000);
    return `60${randomNumber}`;
  }
  try {
    const reqData = await req.json();
    const {name,email,role,password,amount} = reqData;
    const accountNo = accountNumberGenerator();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name,accountNo,role,email,hashedPassword);
    const user = await User.create({name,accountNo,role,email,password:hashedPassword,amount});
    user.password = null;
    return NextResponse.json({success: true,data: user,message:"User created successfully"},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({success:false, message: "Invalid request data" },{status:500});
  }
}