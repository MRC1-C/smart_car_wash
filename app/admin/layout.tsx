
'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link';

const AdminLayout = ({ children }: any) => {
    return (
        <div className='flex h-full'>
            <div className='h-full p-1'>
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items className='bg-slate-300 rounded-xl shadow-xl'>
                        <Sidebar.ItemGroup style={{ marginTop: 0, padding: 8 }}>
                            <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
                                    Dashboard
                            </Sidebar.Item>

                            <Sidebar.Item href="/admin/user" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item href="/admin" icon={HiShoppingBag}>
                                Card
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

            </div>
            <div className='w-full p-3 h-full'>
                <ScrollArea className="p-3 h-full w-full rounded-md border">
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}
export default AdminLayout
