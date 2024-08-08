"use client"
import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { TbLoader } from "react-icons/tb";
import {useRouter} from 'next/navigation'


type response = {
  data:{
    data:String,
    message: string,
    otp: string,
    success: boolean
  }
}


export default function Page() {


  const [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const [email,setEmail] = useState('')
  const [otp, setOtp] = useState("")
  const [loading1,setLoading1] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const router = useRouter();

  const sendMessageHandler = async() => {
    setLoading1(true);
    try {
      if(!email){
        setError('Please enter an email!')
        return; 
      }
      const response:response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp`,{email})
      const data = response.data
      if(!data.success) {
        setError(data.message)
        return;
      }
      setMessage(data.message)
      console.log(data.otp);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading1(false);
    }
    
  }
  
  async function verifyOtpHandler () {
    setLoading2(true);
    try { 
      if(!otp){
        setError('Please enter an OTP!')
        return; 
      }
      const response:response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp?email=${email}&otp=${otp}`) 
      const data = response.data
      if(!data.success) {
        setError(data.message)
        return;
      }
      setMessage(data.message)
      window.localStorage.setItem('user',JSON.stringify(data.data))
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading2(false)
    }
    
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=' flex flex-col gap-4 border-2 border-[#1e293b] p-12 rounded-md  items-center'>
        <h1 className='text-3xl font-Poppins my-4'>Email verification</h1>
        <div className='flex gap-2'>
          <Input placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
          <Button onClick={sendMessageHandler}>{loading1 ? <TbLoader className='text-xl animate-spin' /> : 'Send'}</Button>
        </div>
        {message && <p className='text-green-500'>{message}</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <div className=''>
          <InputOTP maxLength={4}
            onChange={(value) => {
              setOtp(value)
            }}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
            <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div>
          <Button variant='outline' type='submit' onClick={verifyOtpHandler}>{loading2 ? <TbLoader className='animate-spin'/> : 'Verify'}</Button>
        </div>
      </div>
    </div>
  )
}
