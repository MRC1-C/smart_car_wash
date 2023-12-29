import { NextResponse } from 'next/server';
import client from '../prismadb';

export async function GET(req: any) {
    const card_uid = req.nextUrl.searchParams.get('card_uid')

    try {
        // Check if the user exists
        const user = await client.user.findFirst({
            where: { card_uid },
        });

        if (user) {
            const log = await client.userLog.findFirst({
                where: { card_uid, checkindate: new Date().toISOString().slice(0, 10), card_out: false },
            });

            if (!log) {
                // User login
                const currentDate = new Date().toISOString().slice(0, 10);
                const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

                await client.userLog.create({
                    data: {
                        card_uid,
                        checkindate: currentDate,
                        timein: currentTime,
                        timeout: '00:00:00',
                        card_out: false
                    },
                });
                return NextResponse.json({ message: `login ${card_uid}` })
            } else {
                // User logout
                const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

                await client.userLog.update({
                    where: { id: log.id, card_out: false },
                    data: { timeout: currentTime, card_out: true },
                });
                return NextResponse.json({ message: `logout ${card_uid}` })

            }
        } else {
            return NextResponse.json({ message: 'Invalid Card!' })

        }
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

