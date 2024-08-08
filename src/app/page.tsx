"use client"

import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TbLoader } from "react-icons/tb";


type User = {
  name: string,
  accountNo:number,
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    console.log(storedUser.accountNo)
    if (storedUser) { 
      setUser(storedUser);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const logoutHandler = () => {
    setLoading(true);
    try {
      localStorage.removeItem('user');
      router.push('/auth/login');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-8 flex flex-col items-center justify-center min-h-screen">
      {
      user ?
        <div className="items-center fixed top-4 right-4 flex gap-4">
          <div className="flex items-center gap-2">
            <Link className="flex items-center" href={`/user/${user?.accountNo}`}>
              <p>Hello! {user.name}</p>
            </Link>
            <Button onClick={logoutHandler}>{loading ? <TbLoader className="animate-spin"/> : 'Logout'}</Button>
          </div>
        </div> : 
        <div className="fixed top-4 right-4 flex gap-4">
          <Link className="hover:underline" href='/auth/login'>Login</Link>
          <Link className="hover:underline" href='/auth/signup'>Signup</Link>
        </div>
      }
      <div className="flex flex-col items-center gap-4 mt-16">
        <h1 className="font-Merienda text-5xl">Trackit</h1>
        <p className="font-Poppins">A real-time web app to manage the flow of exchange</p>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

const projects = [
  {
    title: "Make Payment",
    description: "Send money with just a scan code and amount",
    link: "/payment/send",
  },
  {
    title: "Receive Payment",
    description: "Show QR code and receive money",
    link: "/payment/receive",
  },
  {
    title: "Payment History",
    description: "Past payment records",
    link: "/payment/history",
  },
];
