/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Transaction = {
  id:string;
  _id: string;
  amount: number;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
  status:["Success","Failed"];
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [paymentFrom,setPaymentFrom] = useState('')
  const [paymentTo,setPaymentTo] = useState('')

  async function getTransactionDetails(id: string) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaction/get?id=${id}`);
      console.log(response.data.data);
      console.log("Get transaction details");
      setTransactionData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserAccount() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaction/user?id=609876`);
      console.log(response.data.data);
      setTransactions(response.data.data);

      await Promise.all(
        response.data.data.map((transaction: any) => getTransactionDetails(transaction))
      );
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserAccount();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-Poppins text-center my-4">Your payment history</h1>
      <div>
        <ul>
          {
            loading? (
              <li>Loading...</li>
            ) : transactionData? (
              <li>
                Transaction ID: {transactionData._id}
                <br />
                Amount: {transactionData.amount}
                <br />
                Status: {transactionData.status}
              </li>
            ) : (
              transactions.map((transaction: any) => (
                <li key={transaction.id}>
                  Transaction ID: {transaction.id}
                  <br />
                  Amount: {transaction.amount}
                  <br />
                  Status: {transaction.status}
                </li>
              ))
            )
          }
        </ul>
      </div>
    </div>
  );
}
