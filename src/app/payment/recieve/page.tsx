"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TbLoader } from "react-icons/tb";
import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';


type User = {
  name: string;
  accountNo: string;
};

export default function Page() {

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [amount,setAmount] = useState('');
  const [account,setAccount] = useState('');
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/auth/login");
      }
    }
  }, [router]);

  async function requestHandler () {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transaction/request`,{amount,from:user?.accountNo,to:account});
      console.log(response.data);
      setSuccess('Payment request sent successfully!');
    } catch (error) {
      console.log
      setError('Failed to send payment request!');
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className='flex items-center justify-center h-[80vh]'>
    <div className="fixed top-4 left-4">
        <Link className="text-3xl hover:underline" href="/">
          <GrHomeRounded className="hover:underline" />
        </Link>
      </div>
    <div className='flex flex-col gap-4 border-2 border-[#2e2e31] px-4 py-8 rounded-md'>
      <div>
        <h1 className='text-4xl font-Poppins'>Request payment</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild >
          <DialogTitle className='flex w-full justify-end'>
            <Button variant='outline'>Request Money</Button>
          </DialogTitle>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h1 className='text-3xl font-WorkSans'>Request money</h1>
          </DialogHeader>
          <DialogDescription>After you enter account no., amount of your request a mail will be sent to the account holder</DialogDescription>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center justify-between'>
              <Label>Account No.</Label>
              <Input className='w-[350px]' placeholder='Enter account number' onChange={(e) => setAccount(e.target.value)}/>
            </div>
            <div className='flex gap-2 items-center justify-between'>
              <Label>Amount (INR)</Label>
              <Input className='w-[350px]' placeholder='Enter amount to request' onChange={(e) => setAmount(e.target.value!)}/>
            </div>
          </div>
          <DialogFooter className='flex items-center justify-between w-full'>
            <div>
              {error && <p className='text-red-400'>{error}</p>}
              {success && <p className='text-green-400'>{success}</p>}
            </div>
            <Button variant="default" onClick={requestHandler}>
              {loading ? <TbLoader className='animate-spin' /> : 'Send request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  )
}
