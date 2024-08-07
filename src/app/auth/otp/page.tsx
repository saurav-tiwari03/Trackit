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

type response = {
  data:{
    message: string,
    otp: string
  }
}


export default function Page() {


  let [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const [email,setEmail] = useState('')
  const [otp, setOtp] = useState("")

  const sendMessageHandler = async() => {
    if(!email){
      setError('Please enter an email!')
      return; 
    }
    const response:response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp`,{email})
    const data = response.data
    setMessage(data.message)
    console.log(data.otp);
  }
  
  async function verifyOtpHandler () {
    const response:response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp?email=${email}&otp=${otp}`) 
    const data = response.data;
    console.log(data.message);
    setMessage(data.message)
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=' flex flex-col gap-4 border-2 border-[#1e293b] p-12 rounded-md  items-center'>
        <h1 className='text-3xl font-Poppins my-4'>Email verification</h1>
        <div className='flex gap-2'>
          <Input placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
          <Button onClick={sendMessageHandler}>Send</Button>
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
          <Button variant='outline' type='submit' onClick={verifyOtpHandler}>Verify</Button>
        </div>
      </div>
    </div>
  )
}
