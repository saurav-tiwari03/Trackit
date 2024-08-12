"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

type User = {
  name: string;
  accountNo: string;
  accountVerifiedToken: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  console.log('Id from params: ', params.id);
  console.log('Id from user: ', user?.accountVerifiedToken);

  async function verifyHandler() {
    try {
      if (!user?.accountVerifiedToken) {
        setMessage("User token not found.");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verifyToken?token=${params.id}`, {
        token: user.accountVerifiedToken,
      });
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex items-center flex-col gap-2'>
        <Button onClick={verifyHandler}>Authorize</Button>
        {message && <p className='text-green-400'>{message}</p>}
      </div>
    </div>
  );
}
