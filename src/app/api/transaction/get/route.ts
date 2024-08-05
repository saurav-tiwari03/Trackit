import connect from "@/config/database";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      throw new Error('Id not found');
    }
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Transaction fetched", data: transaction });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Unable to fetch transaction" }, { status: 500 });
  }
}
