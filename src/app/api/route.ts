import { NextResponse } from "next/server";

export async function GET () {
  try {
    return NextResponse.json({message:"Welcome to trackit backend"},{status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"An error occurred while fetching data"}, {status:500})
  }
}