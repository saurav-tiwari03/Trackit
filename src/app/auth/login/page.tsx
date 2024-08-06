"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Login () {
  const router = useRouter();
  const submitHandler = (e:any) => {
    e.preventDefault();
    console.log('Form submitted');
    router.push('/')
  }
  return (
  <div className="flex items-center justify-center h-screen">
    <div className="border-2 p-8 flex flex-col gap-4">
      <h1 className="text-4xl font-WorkSans font-semibold text-red-500">Login</h1>
      <form className="flex flex-col items-center gap-4" onSubmit={submitHandler}>
        <div className="border-2 border-black p-1 rounded-md">
          <input className="border-none outline-none" type="text" placeholder="Enter account no"/>
        </div>
        <div className="border-2 border-black p-1 rounded-md">
          <input className="border-none outline-none" type="password" name="" id="" placeholder="Enter password"/>
        </div>
        <Button variant="secondary" type="submit">Button</Button>
      </form>
    </div>
  </div>
  )
}