import { NextResponse } from 'next/server';
import client from '../prismadb';

export async function GET(req: any) {

    try {
        // Check if the user exists
        const userLog = await client.userLog.findMany()
        return NextResponse.json(userLog)
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}

export async function POST(req: Request) {
    const { card_uid } = await req.json()
    try {
        const card = await client.user.create({
            data: {
                card_uid: card_uid
            }
        })
        return NextResponse.json({ message: 'Card ID' + card.card_uid })

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}

