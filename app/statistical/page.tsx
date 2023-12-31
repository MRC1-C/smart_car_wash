'use client'
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import mqtt from 'mqtt';


const ChartLine = dynamic(() => import('@/components/chart/ChartLine'), { ssr: false }
);

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Statistical = ({ params }: { params: { id: string } }) => {
  const [succes, setSucces] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isWater, setIsWarter] = useState(false)
  const [isWater1, setIsWarter1] = useState(false)
  const [isWater2, setIsWarter2] = useState(false)
  const [isAuto, setIsAuto] = useState(false)
  const [V, setV] = useState<any>()
  const searchParams = useSearchParams()
  const [time, setTime] = useState(searchParams.get('time'))
  const [card, setCard] = useState(searchParams.get('card'))


  const [client, setClient] = useState<any>(null);



  useEffect(() => {
    const clt = mqtt.connect('wss://test.mosquitto.org:8081', {
      username: '',
      password: '',
      clientId: 'nextjs',
      reconnectPeriod: 2000,
    });

    clt.on('connect', () => {
      console.log('Connected to MQTT broker');
      clt.subscribe('nguyet_doan');
      clt.subscribe('nguyet_doan_v');
      setTimeout(()=>{
        clt.publish('nguyet_doan_v', 'hi');
      },2000)
    });

    clt.on('message', (topic, message) => {
      if (topic == "nguyet_doan_v" && message.toString() !== "hi") {
        setV(message.toString())
      }
      if (topic == "nguyet_doan" && message.toString() == "OnWarter1") {
        setIsWarter(true)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter1") {
        setIsWarter(false)
      }
      if (topic == "nguyet_doan" && message.toString() == "OnWarter2") {
        setIsWarter1(true)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter2") {
        setIsWarter1(false)
      }
      if (topic == "nguyet_doan" && message.toString() == "OnWarter3") {
        setIsWarter2(true)
      }
      if (topic == "nguyet_doan" && message.toString() == "OFFWarter3") {
        setIsWarter2(false)
        setIsAuto(false)
        setIsStart(true)
      }
      console.log(`Received message from topic ${topic}: ${message.toString()}`);

    });

    setClient(clt);

    return () => {
      if (client) {
        client.end();
      }
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
                <div className='text-[70px] font-bold'>{time}</div>
              </div>
            </div>
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thời gian rửa xong</div>
            {
              isStart && !isWater && !isWater1 && !isWater2 ?
                <div className='h-full'>
                  <div className='h-full flex items-center justify-center'>
                    <div className='text-[70px] font-bold'>{new Date().toLocaleTimeString('en-US', { timeZone: "Asia/Ho_Chi_Minh", hour12: false })}</div>
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
                    } >{!isWater ? 'Bật Nước' : 'Tắt Nước'} </div>
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
                    } >{!isWater1 ? 'Bật Xà Phòng' : 'Tắt Xà Phòng'} </div>
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
                  }>{'Tự động'}</div>
                </div>


            }
          </div>
          <div className='bg-white h-full flex flex-col items-center ring-1 ring-purple-500 rounded-lg shadow-lg'>
            <div className='font-semibold'>Thể tích xe</div>
            <div className='h-full w-full flex justify-center items-center'>
              {
                V ?
                  <div className='font-bold text-[80px]'>
                    {V.split('.')[0]}
                  </div> :
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg self-center'>Đang tính</p>
                    <p className='text-xl font-bold'>Thể tích xe</p>
                  </div>
              }
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
              <p className='font-bold text-purple-500'>{V >= 0 && V < 10000 ? "100.000" : (V >= 10000 && V < 20000 ? "150.000" : "200.000")}VNĐ</p>
              <img src={`https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${V >= 0 && V < 10000 ? "100000" : (V >= 10000 && V < 20000 ? "150000" : "200000")}&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid`} className='w-full aspect-square px-8' />
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
          axios.get('/api/card?card_uid=' + card)
            .then(data => {
              route.push('/')
            })
            .catch(err => console.log(err))
        }}>Thanh toán</Button>
      </div>
    </div>
  )
}

export default Statistical