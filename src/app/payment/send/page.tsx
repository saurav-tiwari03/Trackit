"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Page() {

  const [accountNo, setAccountNo] = useState('');
  const [pastPaidAccounts, setPastPaidAccounts] = useState<string[]>([]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("pastPaidAccounts");
    if (storedAccounts) {
      setPastPaidAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  const submitHandler = (e:any) => {
    e.preventDefault();
    console.log('Form submitted');

    const updatedAccounts = [...pastPaidAccounts, accountNo];
    setPastPaidAccounts(updatedAccounts);
    localStorage.setItem("pastPaidAccounts", JSON.stringify(updatedAccounts));
  }

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="fixed top-4 left-4">
        <Link className="text-3xl hover:underline" href="/"><GrHomeRounded className="hover:underline"/></Link>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl my-12">Enter the account no to send money</h1>
        <div className="items-center justify-center border-2 border-[#2e2e31] px-4 py-8 rounded-md">
          <form className="flex gap-4" onSubmit={submitHandler}>
            <Input className="m-auto" placeholder="Account number" onChange={(e) => setAccountNo(e.target.value)} />
            <Button variant="default" type="submit">Enter</Button>
          </form>
        </div>
        <div>
          {
            pastPaidAccounts.length > 0 &&
            <div className="my-12 border-2 border-[#2e2e31] p-4">
              <h2 className="text-2xl my-2 font-semibold">Past paid accounts:</h2>
              <ul>
                {pastPaidAccounts.map((account) => (
                  <li className="flex items-center justify-between" key={account}>
                    <p className="text-xl">{account}</p>
                    <DialogDemo account={account}/>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

type Account = {
  account:string;
}

export function DialogDemo(account: Account) {
  console.log(account.account)
  const data = account.account;
  return (
  <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Make payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter amount</DialogTitle>
          <DialogDescription>
            Please check the account number and enter amount
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Account
            </Label>
            <Input
              id="name"
              defaultValue={data}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Amount
            </Label>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  )
}