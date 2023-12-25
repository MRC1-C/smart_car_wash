'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('statistical')
    }, 5000)
  }, [router])
  return (
    <main className="flex min-h-screen mx-auto max-w-3xl flex-col items-center justify-between p-24">
      <div className='font-bold text-3xl'>
        Rửa xe thông minh
      </div>
      <div className='font-semibold text-xl'>
        Hãy quẹt thẻ
      </div>
      <Image src={'/Card.gif'} alt='card' className='w-full aspect-video rounded-lg' width={1000} height={400} />
    </main>
  )
}
