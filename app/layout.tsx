import { TeamsProvider } from '@/hooks/TeamsContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Basket Stats',
  description: 'App to score basket stats 3x3 match',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
        />
        <meta name='theme-color' content='#d3acfe' media='(prefers-color-scheme: dark)' />
        <meta charSet='utf-8' />
        
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        
        <link rel='apple-touch-icon' href='/icons/icon-512x512.png' />
      </Head>
      
      <body className={inter.className} suppressHydrationWarning={true}>
        <TeamsProvider><div className='min-h-screen bg-purple-200 pt-2 pb-3 px-3'>{children}</div></TeamsProvider>
      </body>
    </html>
  )
}
