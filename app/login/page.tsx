'use client'
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import client from '../api/prismadb'
import axios from 'axios'


const Login = () => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const route = useRouter()

    const onLogin = async () => {
        try {
            signIn('credentials', {
                name: user.name,
                password: user.password,
                redirect: false,
            })
            axios.get('/api/userlog?name=' + user.name)
                .then(data => {
                    route.push('/')
                })


        } catch (error) {
            console.error('Lỗi đăng nhập', error);
        }
    };

    return (
        <div className='max-w-xl mx-auto h-screen flex'>
            <div className='w-full p-2 flex flex-col items-center justify-center py-2'>
                <div className='flex flex-col w-full ring-1 ring-purple-500 rounded-lg shadow-xl p-3'>
                    <h1 className='text-xl font-medium mb-4'>Đăng nhập</h1>
                    <label htmlFor="" className='mb-2'>Tên nhân viên</label>
                    <input
                        type="text"
                        className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                        id='email'
                        value={user.name}
                        placeholder='tên nhân viên'
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <label htmlFor="" className='mb-2'>Mật khẩu</label>
                    <input
                        type="password"
                        className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                        id='password'
                        value={user.password}
                        placeholder='mật khẩu'
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button onClick={onLogin} className='p-2 rounded-lg border bg-purple-600 text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600'>
                        Đăng nhập
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Login