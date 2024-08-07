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


export default function Page() {


  let [message,setMessage] = useState('')
  const [error,setError] = useState('')
  let [otp, setOtp] = useState("")
  const [email,setEmail] = useState('')
  const [data, setData] = useState("")

  const sendMessageHandler = () => {
    if(!email){
      setError('Please enter an email!')
      return; 
    }
    setMessage('OTP sent successfully!')
  }
  
  function verifyOtpHandler () {
    console.log(data);
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
              setData(value)
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
