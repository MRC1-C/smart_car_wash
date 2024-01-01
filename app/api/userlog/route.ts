import { NextResponse } from 'next/server';
import client from '../prismadb';

export async function GET(req: any) {
    const name = req.nextUrl.searchParams.get('name')

    try {
        // Check if the user exists
        const user = await client.staff.findFirst({
            where: {
                name
            }
        });

        if (user) {
            const log = await client.staffLog.findFirst({
                where: { date: new Date().toISOString().slice(0, 10), logout: '00:00:00' },
            });

            if (!log) {
                // User login
                const currentDate = new Date().toISOString().slice(0, 10);
                const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

                await client.staffLog.create({
                    data: {
                        staffId: user.id,
                        date: currentDate,
                        login: currentTime,
                        logout: '00:00:00',
                    },
                });
                return NextResponse.json({ message: `login ${name}` })
            } else {
                // User logout
                const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

                await client.staffLog.update({
                    where: { id: log.id },
                    data: { logout: currentTime },
                });
                return NextResponse.json({ message: `logout ${name}` })

            }
        } else {
            return NextResponse.json({ message: 'Không có nhân viên này' })

        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' })

    }
}

