/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {  useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";

type Transaction = {
  transaction: string;
  id: string;
  _id: string;
  amount: number;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
  status: "Success" | "Failed";
};

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const id = JSON.parse(localStorage.getItem("user")!) || null;
  console.log(id.accountNo);

  if (!id) {
    router.push("/auth/login");
  }

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/user?id=${id.accountNo}`
      );
      console.log(response.data.data);
      setTransactionList(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        setErrorMessage("Error fetching list of transactions");
      } else {
        console.log("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-4 left-4">
        <Link className="text-3xl hover:underline" href="/">
          <GrHomeRounded className="hover:underline" />
        </Link>
      </div>
      <h1 className="text-4xl font-Poppins text-center my-4">
        Your payment history
      </h1>
      <div className="flex justify-center">
        <Button onClick={fetchHistory}>
          {loading ? <ImSpinner3 className="text-2xl animate-spin" /> : "Fetch History"}
        </Button>
      </div>
      <div className="flex items-center justify-center flex-col mt-8">
        <h2 className="font-Poppins font-semibold text-2xl">
          Here is the list of Transaction ID
        </h2>
        <p className="text-lg my-4">Soon this page will be developed completely</p>
        {errorMessage && (
          <div className="p-8 border">
            <p className="text-red-400">{errorMessage}</p>
          </div>
        )}
        <ul className={`${transactionList.length > 0 ? "border p-8" : ""}`}>
          {transactionList.map((transaction) => (
            <li key={transaction}>{transaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
