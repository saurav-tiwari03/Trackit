"use client"

import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  let [user,setUser] = useState(JSON.parse(localStorage.getItem('user')!));

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user) {
        router.push('/auth/login');
      } else {
        toast('Welcome to trackit', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
    }
  });

  const logoutHandler = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  }
  console.log(user.data)

  return (
    <div className="max-w-5xl mx-auto px-8 flex flex-col items-center justify-center h-screen">
      {
      user ?
        <div className="items-center fixed top-4 right-4 flex gap-4">
          <p>Hello! {user.name}</p>
          <Button onClick={logoutHandler}>Logout</Button>
        </div> : 
        <div className="fixed top-4 right-4 flex gap-4">
          <Link className="hover:underline" href='/auth/login'>Login</Link>
          <Link className="hover:underline" href='/auth/signup'>Signup</Link>
        </div>
      }
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-Merienda text-5xl">Trackit</h1>
        <p className="font-Poppins">A real-time web app to manage the flow of exchange</p>
      </div>
      <HoverEffect items={projects} />
      <ToastContainer />
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
