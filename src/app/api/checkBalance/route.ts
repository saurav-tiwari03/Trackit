import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/config/database';

connect();

export async function POST(req:NextRequest){
  try {
    const reqData = await req.json();
    const {accountNo,pin} = reqData;
    if(!accountNo || !pin){
      throw new Error('Account number and PIN are required');
    }
    const user = await User.findOne({accountNo});
    if(user.pin == pin) {
      return NextResponse.json({success: true, message: 'Pin matched',data:user.balance});
    }
    else {
      return NextResponse.json({success: false, message: 'Incorrect PIN'});
    }
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({success: false, message: error.message});
  }
}