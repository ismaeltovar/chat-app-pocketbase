import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat app',
  description: 'Chat Application using ReactJS & Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-green-200'>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
