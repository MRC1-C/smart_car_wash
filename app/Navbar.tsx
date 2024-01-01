'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const Navbar = () => {
    const { data: session, status } = useSession()
    const route = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.pathname != "/login" && !session && status != 'loading') {
            redirect('/login')
        }
    }, [session, status])
    if (typeof window !== 'undefined' && window.location.pathname == "/login")
        return <></>
    if (session && session.user) {
        return (
            <div className="flex p-1 px-3 items-center justify-between">
                <p className="text-purple-500 font-bold">{session.user.name}</p>
                <Button onClick={() => {
                    signOut()
                    axios.get('/api/userlog?name=' + session.user.name)
                }
                }>
                    Đăng xuất
                </Button>
            </div>
        );
    }
    return (
        <div className="flex p-1 px-3 items-center justify-between">
            <p className="text-purple-500 font-bold">Wash Car</p>
            <Button onClick={() => {
                route.push('/login')
            }
            }>
                Đăng nhập
            </Button>
        </div>
    );

}

export default Navbar