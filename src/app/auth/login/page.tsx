"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { TbLoader } from "react-icons/tb";
import axios from "axios";


export default function Login () {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      router.push('/')
    }
  },[])

  const submitHandler = async(e:any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{email,password});
      console.log(response.data)
      const data = response.data
      localStorage.setItem('user',JSON.stringify(data.data))
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
  <div className="flex items-center justify-center h-screen">
    <div className="border-2 p-8 flex flex-col gap-4">
      <h1 className="text-4xl font-WorkSans font-semibold ">Login</h1>
      <form className="flex flex-col items-center gap-4" onSubmit={submitHandler}>
          <div className="flex items-center gap-2 justify-between w-full">
            <Label>Email </Label>
            <Input className="w-[200px]" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="flex items-center gap-2 justify-between w-full">
            <Label>Password </Label>
            <Input className="w-[200px]" placeholder="Enter email" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        <Button variant="default" type="submit">{loading ? <TbLoader className="animate-spin"/> : 'Login'}</Button>
      </form>
      <hr />
      <div className="w-full justify-between flex items-center my-4">
        <Link href='/auth/signup'><Button variant="outline">Singup</Button></Link>
        <Link className="text-sm hover:underline" href='/auth/otp'>Login with OTP</Link>
      </div>
    </div>
  </div>
  )
}