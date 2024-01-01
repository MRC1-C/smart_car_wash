'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
export function Admin() {
    const [data, setData] = useState<Array<any>>([])
    useEffect(() => {
        axios.get('/api/admin')
            .then(data => setData(data.data))
            .catch(err => console.log(err))
    }, [])
    if(data.length ==0)
    return <div>
        loading
    </div>
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Card ID</TableHead>
                    <TableHead>Checkin date</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead className="text-right">Time Out</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.card_uid}</TableCell>
                        <TableCell>{invoice.checkindate}</TableCell>
                        <TableCell>{invoice.timein}</TableCell>
                        <TableCell className="text-right">{invoice.timeout}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Admin