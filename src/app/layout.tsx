import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "SOFN Store",
  description: "A simple store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
