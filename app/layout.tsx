import type { Metadata } from 'next'
import { Quicksand } from "next/font/google"
import './globals.css'
import { cn } from "@/lib/utils"


export const fontSans = Quicksand({
  subsets: ["vietnamese"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: 'Smart wash',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}      >{children}</body>
    </html>
  )
}
