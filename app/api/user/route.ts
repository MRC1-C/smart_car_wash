import { NextResponse } from 'next/server';
import client from '../prismadb';
import bcrypt from "bcrypt"


export async function GET(req: any) {

    try {
        const staff = await client.staff.findMany()
        return NextResponse.json(staff)
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}

export async function POST(req: Request) {
    const { name, password, role } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        const staff = await client.staff.create({
            data: {
                name: name,
                password: hashedPassword,
                role: role
            }
        })
        return NextResponse.json(staff)

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}


export async function DELETE(req: any) {
    const id = req.nextUrl.searchParams.get('id')
    try {
        const staff = await client.staff.delete({
            where: {
                id
            }
        })
        return NextResponse.json(staff)

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}

