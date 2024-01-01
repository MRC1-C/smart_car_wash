import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import client from '../../prismadb';


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: {
                    label: 'name',
                    type: 'text',
                    placeholder: 'your email'
                },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: 'your password'
                }
            },
            async authorize(credentials) {

                if (!credentials?.name || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }
                const user = await client.staff.findUnique({
                    where: {
                        name: credentials.name
                    }
                })

                if (!user || !user?.password) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectedPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isCorrectedPassword) {
                    throw new Error('Invalid credentials')
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        
        session: async ({ session, token, user }) => {
            console.log(user)
            if (session?.user) {
                session.user.id = token.uid;
                session.user.role = token.role
            }
            return session
        },
        jwt: async ({ user, token }:any) => {
            if (user) {
                token.uid = user.id
                token.role = user.role
            }
            return token
        },
        
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
}