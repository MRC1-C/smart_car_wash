'use client'
import Image from 'next/image'
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter()
  const {data: session} = useSession()
  useEffect(()=>{
    if(session?.user.role == "ADMIN"){
      router.push('admin')
    }
  },[session])
  const onsubmit = () => {
    axios.get('/api/card?card_uid=123')
      .then(data => {
        router.push('statistical')
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='h-full'>
      <main className="flex h-full mx-auto max-w-3xl flex-col items-center justify-between p-24">
        <div className='font-bold text-3xl'>
          Rửa xe thông minh
        </div>
        <div className='font-semibold text-xl'>
          Hãy quẹt thẻ
        </div>
        <img src={'/Card.gif'} alt='card' className='w-full aspect-video object-cover rounded-lg' />
        <Button onClick={onsubmit}>Quẹt thẻ</Button>
      </main>

    </div>
  )
}
