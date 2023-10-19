import { TeamsProvider } from '@/hooks/TeamsContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Basket Stats',
  description: 'Created to score basket stats play',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <TeamsProvider><div className='min-h-screen bg-purple-200 pt-2 pb-3 px-3'>{children}</div></TeamsProvider>
      </body>
    </html>
  )
}
