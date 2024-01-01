'use client'

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import axios from "axios"
import { useEffect, useState } from "react"
export function User() {
    const [data, setData] = useState<Array<any>>([])
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<any>('')
    const [password, setPassword] = useState<any>('')



    useEffect(() => {
        axios.get('/api/user')
            .then(data => setData(data.data))
            .catch(err => console.log(err))
    }, [])
    if (data.length == 0)
        return <div>
            loading
        </div>
    return (
        <div className="flex flex-col">
            <Button onClick={(() => setOpen(true))} className="self-end">Thêm nhân viên mới</Button>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Thêm nhân viên mới</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <form>

                    </form>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Tên nhân viên
                            </Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-left">
                                Mật khẩu
                            </Label>
                            <Input id="username" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" onClick={() => {
                            console.log(name, password)
                            axios.post('/api/user', {
                                name,
                                password
                            })
                                .then(data => {
                                    axios.get('/api/user')
                                        .then(data => setData(data.data))
                                        .catch(err => console.log(err))
                                    setOpen(false)
                                    setName('')
                                    setPassword('')
                                })
                        }}>Thêm nhân viên</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>Tên nhân viên</TableHead>
                        <TableHead>Chức vụ</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.name}</TableCell>
                            <TableCell>{invoice.role}</TableCell>
                            <TableCell>
                                <Button onClick={() => {
                                    axios.delete('/api/user?id=' + invoice.id)
                                        .then(dt => {
                                            axios.get('/api/user')
                                                .then(data => setData(data.data))
                                                .catch(err => console.log(err))
                                        })
                                }}>Xoá</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default User