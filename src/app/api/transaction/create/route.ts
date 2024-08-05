import connect from "@/config/database";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

// Make a payment
export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const { amount, from, to } = reqData;

    if (!amount || !from || !to) {
      return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 });
    }

    const user1 = await User.findById(from);
    const user2 = await User.findById(to);

    if (!user1 || !user2) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const transactionAmount = parseFloat(amount);

    if (isNaN(transactionAmount)) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    const newAmount1 = parseFloat(user1.balance) - transactionAmount;
    const newAmount2 = parseFloat(user2.balance) + transactionAmount;

    user1.balance = newAmount1;
    user2.balance = newAmount2;

    const transaction = await Transaction.create({ amount: transactionAmount, from, to });

    user1.transactions.push(transaction._id);
    user2.transactions.push(transaction._id);

    await user1.save();
    await user2.save();

    return NextResponse.json({ success: true, message: "Transaction completed", transaction }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Unable to process transaction" }, { status: 500 });
  }
}
