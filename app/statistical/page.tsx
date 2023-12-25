'use client'
import ChartArea from '@/components/chart/ChartArea'
import ChartLine from '@/components/chart/ChartLine'
import ChartLine2 from '@/components/chart/ChartLine2'
import ChartLiquid from '@/components/chart/ChartLiquid'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Statistical = () => {
  const [succes, setSucces] = useState(false)
  const route = useRouter()
  useEffect(() => {
    setSucces(false)
    setTimeout(() => {
      setSucces(true)
      setTimeout(() => {
        route.push('/')
      }, 2000)
    }, 5000)
  }, [route])
  return (
    <div className='grid grid-cols-3 gap-3 h-screen p-3 bg-gray-100'>
      <div className='col-span-2 flex flex-col gap-3'>
        <div className='grid grid-cols-3 h-1/2 gap-3'>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Lượng nước</div>
            <div className='h-full'>
              <div className='h-full'>
                <ChartLiquid />
              </div>
            </div>
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Lượng nước</div>
            <div className='h-full w-full'>
              <div className='h-full w-full'>
                <ChartLine2 />
              </div>
            </div>
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Lượng nước</div>
            <div className='h-full w-full'>
              <div className='h-full'>
                <ChartArea />
              </div>
            </div>
          </div>
        </div>
        <div className='h-1/2'>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Lượng nước</div>
            <div className='h-full w-full'>
              <div className='h-full'>
                <ChartLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
        <div className='font-bold'>
          Thanh toán bằng mã QR
        </div>
        <div className='text-sms'>
          Tổng tiền là
        </div>
        <p className='font-bold text-purple-500'>100.000VNĐ</p>
        <img src='/QR.svg' className='w-full aspect-square px-8' />
        {
          succes && <div className='font-bold text-green-400 flex gap-2'>Bạn đã thanh toán thành công
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        }
      </div>
    </div>
  )
}

export default Statistical