"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, FormEvent } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConfettiExplosion from 'react-confetti-explosion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

type User = {
  name: string;
  accountNo: string;
};

type AccountProps = {
  account: string;
  exist: boolean | null;
};

type ModalProps = {
  account: string;
};

export default function Page() {
  const [toAccountNo, setToAccountNo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [pastPaidAccounts, setPastPaidAccounts] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [accountStatus, setAccountStatus] = useState<boolean | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccounts = localStorage.getItem("pastPaidAccounts");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/auth/login");
    }

    if (storedAccounts) {
      setPastPaidAccounts(JSON.parse(storedAccounts));
    }
  }, [router]);

  async function makeTransaction() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transaction/create`, {
        amount,
        from: user?.accountNo,
        to: toAccountNo,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (pastPaidAccounts.includes(toAccountNo)) {
      toast({
        title: "Please check past payment",
        description: "",
      });
      return;
    }

    makeTransaction();

    const updatedAccounts = [...pastPaidAccounts, toAccountNo];
    setPastPaidAccounts(updatedAccounts);
    localStorage.setItem("pastPaidAccounts", JSON.stringify(updatedAccounts));
  };

  const checkAccountNo = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, { accountNo: toAccountNo });
      setAccountStatus(response.data.exist);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="fixed top-4 left-4">
        <Link className="text-3xl hover:underline" href="/">
          <GrHomeRounded className="hover:underline" />
        </Link>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl my-12">Enter the account no to send money</h1>
        <div className="items-center justify-center border-2 border-[#2e2e31] px-4 py-8 rounded-md">
          <form className="flex gap-4" onSubmit={submitHandler}>
            <Input className="m-auto" placeholder="Account number" onChange={(e) => setToAccountNo(e.target.value)} />
            <div onClick={checkAccountNo}>
              <ConfirmPayment account={toAccountNo} exist={accountStatus} />
            </div>
          </form>
        </div>
        {pastPaidAccounts.length > 0 && (
          <div className="my-12 border-2 border-[#2e2e31] p-4">
            <h2 className="text-2xl my-2 font-semibold">Past paid accounts:</h2>
            <ul>
              {pastPaidAccounts.map((account) => (
                <li className="flex items-center justify-between" key={account}>
                  <p className="text-xl">{account}</p>
                  <Modal account={account} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
        {isExploding && <ConfettiExplosion />}
        </div>
      </div>
    </div>
  );
}

function ConfirmPayment({ account, exist }: AccountProps) { 
  const user = JSON.parse(localStorage.getItem('user')!);
  let message = exist ? "Account exists" : "Account does not exist";
  const [amount,setAmount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const { width, height } = useWindowSize();
  const [paymentStatus,setPaymentStatus] = useState('');

  const submitHandler = async() => {
    try {      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transaction/create`,{amount,from:user.accountNo,to:account})
      console.log(response.data);
      setIsExploding(true);
      setPaymentStatus('Completed');
    } catch (error) {
      console.log(error)
      setPaymentStatus('Failed')
    }
  };

  if(!exist) {
    message = "Account does not exist"
  }

  return (
    <div>
      {isExploding && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          gravity={0.4}
        />
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Confirm Payment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter amount</DialogTitle>
            <DialogDescription>
              Please check the account number and enter the amount
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="account-label" className="text-right">
                Account No.
              </Label>
              <Input
                id="account-label"
                value={account}
                className="col-span-3 cursor-no-drop"
                readOnly
              />
            </div>
            <div>
              <p className={`text-center ${exist ? "text-green-500" : "text-red-500"}`}>{message}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (INR)
              </Label>
              <Input
                id="amount"
                className="col-span-3"
                placeholder="Enter amount"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitHandler} type="button">
              Send money
            </Button>
          </DialogFooter>
          <div className={`${paymentStatus == "completed" ? 'text-green-500' :'text-red-500'}`}>{paymentStatus}</div>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}

function Modal({ account }: ModalProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Make payment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter amount</DialogTitle>
            <DialogDescription>
              Please check the account number and enter the amount
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="account-label" className="text-right">
                Account
              </Label>
              <Input
                id="account-label"
                value={account}
                className="col-span-3 cursor-no-drop"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                className="col-span-3"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
