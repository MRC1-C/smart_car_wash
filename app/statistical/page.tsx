'use client'
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import mqtt from 'mqtt';


const ChartLine = dynamic(() => import('@/components/chart/ChartLine'), { ssr: false }
);

const ChartLiquid = dynamic(() => import('@/components/chart/ChartLiquid'), { ssr: false }
);

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useStore from '../store';

const Statistical = ({ params }: { params: { id: string } }) => {
  const [succes, setSucces] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isWater, setIsWarter] = useState(false)
  const [isWater1, setIsWarter1] = useState(false)
  const [isWater2, setIsWarter2] = useState(false)
  const [isAuto, setIsAuto] = useState(false)
  const [V, setV] = useState<any>(0)
  const time = useStore((state: any) => state.time)
  const card_uid = useStore((state: any) => state.card_uid)


  const [client, setClient] = useState<any>(null);



  useEffect(() => {
    const client = mqtt.connect('wss://test.mosquitto.org:8081', {
      username: '',
      password: '',
      clientId: 'nextjs',
      reconnectPeriod: 2000,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('nguyet_doan');
      client.subscribe('nguyet_doan_send');
      client.subscribe('nguyet_doan_v');
      client.publish('nguyet_doan_v', 'hi');
      setTimeout(() => {
        client.publish('nguyet_doan_send', 'd');

      }, 2000)
    });

    client.on('message', (topic, message) => {
      if (topic == "nguyet_doan_v" && message.toString() !== "hi") {
        setV(message.toString())
      }
      if (topic == "nguyet_doan" && message.toString() == "ONWarter1") {
        setIsWarter(false)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter1") {
        setIsWarter(true)
      }
      if (topic == "nguyet_doan" && message.toString() == "ONWarter2") {
        setIsWarter1(false)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter2") {
        setIsWarter1(true)
      }
      if (topic == "nguyet_doan" && message.toString() == "ONWarter3") {
        setIsWarter2(false)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter3") {
        setIsWarter2(true)
        setSucces(false)
      }
      console.log(`Received message from topic ${topic}: ${message.toString()}`);

    });

    setClient(client);

    return () => {
      client.end();
    };
  }, []);
  const sendMessage = (mess: string) => {
    if (client) {
      client.publish('nguyet_doan', mess);
    }
  };


  const route = useRouter()
  return (
    <div className='h-full grid grid-cols-3 gap-3 p-3 bg-gray-100'>
      <div className='col-span-2 flex flex-col gap-3'>
        <div className='grid grid-cols-3 h-1/2 gap-3'>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thời gian vào</div>
            <div className='h-full'>
              <div className='h-full flex items-center justify-center'>
                <div className='text-[80px] font-bold'>{decodeURIComponent(time)}</div>
              </div>
            </div>
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thời gian rửa xong</div>
            {
              isStart && !isWater && !isWater1 && !isWater2 ?
                <div className='h-full'>
                  <div className='h-full flex items-center justify-center'>
                    <div className='text-[90px] font-bold'>{new Date().toLocaleTimeString('en-US', { hour12: false })}</div>
                  </div>
                </div> :
                <div className='flex flex-col gap-6 h-full justify-center items-center'>
                  <div className={`ring-1 cursor-pointer ${!isWater ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isWater ? 'bg-purple-400' : 'bg-yellow-400'} text-white`}
                    onClick={() => {
                      if (isWater == false) {
                        sendMessage("RELAY1ON")
                      }
                      else {
                        sendMessage("RELAY1OFF")
                      }
                      setIsWarter(!isWater)
                    }
                    } >{!isWater ? 'Bật Nước 1' : 'Tắt Nước 1'} </div>
                  <div className={`ring-1 cursor-pointer ${!isWater1 ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isWater1 ? 'bg-purple-400' : 'bg-yellow-400'} text-white`}
                    onClick={() => {
                      if (isWater1 == false) {
                        sendMessage("RELAY2ON")
                      }
                      else {
                        sendMessage("RELAY2OFF")
                      }
                      setIsWarter1(!isWater1)
                    }
                    } >{!isWater1 ? 'Bật Nước 2' : 'Tắt Nước 2'} </div>
                  <div className={`ring-1 cursor-pointer ${!isWater2 ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isWater2 ? 'bg-purple-400' : 'bg-yellow-400'} text-white`} onClick={() => {
                    setIsStart(true)
                    if (isWater2 == false) {
                      sendMessage("RELAY3ON")
                    }
                    else {
                      sendMessage("RELAY3OFF")
                    }
                    setIsWarter2(!isWater2)
                    setSucces(false)
                  }
                  }>{!isWater2 ? 'Bật Quạt' : 'Tắt Quạt'}</div>
                  <div className={`ring-1 cursor-pointer ${!isAuto ? 'ring-purple-500' : 'ring-yellow-500'} text-xl rounded-lg p-3 font-bold ${!isAuto ? 'bg-purple-400' : 'bg-yellow-400'} text-white`} onClick={() => {
                    setIsAuto(true)
                    sendMessage("auto")
                  }
                  }>{!isWater2 ? 'Tự động' : 'Tắt Quạt'}</div>
                </div>


            }
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thể tích xe</div>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='font-bold text-8xl'>
                {V}
                {/* <ChartLiquid v={V}/> */}
              </div>
            </div>
          </div>
        </div>
        <div className='h-1/2'>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Lượng nước</div>
            <div className='h-full w-full'>
              <div className='h-full'>
                <ChartLine isWater={isWater} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>

        {
          isStart == true && isWater == false && isWater1 == false && isWater2 == false ?
            <div className='flex flex-col items-center'>
              <div className='font-bold'>
                Thanh toán bằng mã QR
              </div>
              <div className='text-sms'>
                Tổng tiền là
              </div>
              <p className='font-bold text-purple-500'>100.000VNĐ</p>
              <img src='/QR.svg' className='w-full aspect-square px-8' />
            </div>
            :
            <div className='w-full p-8 flex flex-col items-center'>
              <div className='font-bold'>
                Đang rửa xe
              </div>
              <img src={'/washcar.gif'} alt='card' className='w-full aspect-square object-cover rounded-xl shadow-xl' />

            </div>

        }
        {
          succes && <div className='font-bold text-green-400 flex gap-2'>Bạn đã thanh toán thành công
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        }
        <Button onClick={() => {
          setSucces(true)
          axios.get('/api/card?card_uid=' + card_uid)
            .then(data => {
              route.push('/')
            })
            .catch(err => console.log(err))
        }}>Quét thẻ thảnh công</Button>
      </div>
    </div>
  )
}

export default Statistical