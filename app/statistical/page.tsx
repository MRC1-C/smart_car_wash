'use client'
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"

// Dynamic import for client-side only components
const ChartArea = dynamic(() => import('@/components/chart/ChartArea'), { ssr: false }
);
const ChartLine = dynamic(() => import('@/components/chart/ChartLine'), { ssr: false }
);
const ChartLine2 = dynamic(() => import('@/components/chart/ChartLine2'), { ssr: false }
);
const ChartLiquid = dynamic(() => import('@/components/chart/ChartLiquid'), { ssr: false }
);

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Statistical = () => {
  const [succes, setSucces] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isWater, setIsWarter] = useState(false)
  const [isWater1, setIsWarter1] = useState(false)


  const route = useRouter()
  return (
    <div className='grid grid-cols-3 gap-3 h-screen p-3 bg-gray-100'>
      <div className='col-span-2 flex flex-col gap-3'>
        <div className='grid grid-cols-3 h-1/2 gap-3'>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thời gian vào</div>
            <div className='h-full'>
              <div className='h-full flex items-center justify-center'>
                <div className='text-[90px] font-bold'>9:00</div>
              </div>
            </div>
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thời gian rửa xe</div>
            {
              isStart && !isWater && !isWater1 ?
                <div className='h-full'>
                  <div className='h-full flex items-center justify-center'>
                    <div className='text-[90px] font-bold'>16p</div>
                  </div>
                </div> :
                <div className='flex flex-col gap-6 h-full justify-center items-center'>
                  <div className={`ring-1 cursor-pointer ${!isWater ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isWater ? 'bg-purple-400' : 'bg-yellow-400'} text-white`}
                    onClick={() => {
                      setIsWarter(!isWater)
                    }
                    } >{!isWater ? 'Bật Nước' : 'Tắt Nước'} </div>
                  <div className={`ring-1 cursor-pointer ${!isWater1 ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isWater1 ? 'bg-purple-400' : 'bg-yellow-400'} text-white`} onClick={() => {
                    setIsStart(true)

                    setIsWarter1(!isWater1)
                    setSucces(false)
                    setTimeout(() => {
                      setTimeout(() => {
                        route.push('/')
                      }, 2000)
                      setSucces(true)
                    }, 5000)
                  }
                  }>{!isWater1 ? 'Bật Quạt' : 'Tắt Quặt'}</div>
                </div>

            }
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Dung lượng</div>
            <div className='h-full w-full'>
              <div className='h-full'>
                <ChartLiquid />
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