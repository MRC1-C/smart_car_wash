import client from '@/app/api/prismadb'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'

const Dashboard = async () => {
    const data: any = await client.staffLog.findMany({
        include: {
            Staff: {
                select: {
                    name: true
                }
            }
        }
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">id</TableHead>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Bắt đầu ca</TableHead>
                    <TableHead>Tan ca</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice: any) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.Staff.name}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.login}</TableCell>
                        <TableCell>{invoice.logout}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Dashboard