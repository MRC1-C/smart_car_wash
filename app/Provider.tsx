'use client'
import React, { ReactNode } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import Navbar from "./Navbar"


type Props = {
    children: ReactNode
}


const Provider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>

    )
}

export default Provider