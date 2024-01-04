'use client'
import Image from 'next/image'
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import useStore from './store';


export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const setTime = useStore((state:any) => state.setTime)
  const setCard = useStore((state:any) => state.setCard)


  useEffect(() => {
    const client = mqtt.connect('wss://90ebf5e8f64841f897882d8fa2a557af.s2.eu.hivemq.cloud:8884/mqtt', {
      username: 'slave',
      password: 'Test1234',
      clientId: 'nextjs',
      reconnectPeriod: 2000,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('rfid');
    });

    client.on('message', (topic, message) => {
      console.log(`Received message from topic ${topic}: ${message.toString()}`);
      axios.get('/api/card?card_uid=' + message.toString())
        .then(data => {
          setTime(data.data.id)
          console.log(data)
          setCard(message.toString())
          router.push('/statistical')
        })
        .catch(err => console.log(err))
    });


    return () => {
      client.end();
    };
  }, []);
  useEffect(() => {
    if (session?.user.role == "ADMIN") {
      router.push('admin')
    }
  }, [session])

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
      </main>

    </div>
  )
}
