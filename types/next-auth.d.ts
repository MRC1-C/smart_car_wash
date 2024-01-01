import NextAuth from "next-auth/next";
declare module 'next-auth' {
    interface User {
        id: String
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string,
            role: string
        } & DefaultSession['user']
    }
}