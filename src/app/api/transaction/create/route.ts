import connect from "@/config/database";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST (req:NextRequest) {
  try {
    const reqData = await req.json();
    const {amount,from,to} = reqData;
    const transaction = await Transaction.create({amount,from,to});
    return NextResponse.json({success:true, message: "Transaction completed",transaction },{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({success:false, message: "Invalid request data" },{status:500});
  }
}