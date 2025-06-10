// import { TeamsProvider } from '@/hooks/TeamsContext'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/containers/Header'
import Sidebar from '@/containers/Sidebar'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'BaskSanta'
const APP_DEFAULT_TITLE = "Basket Stats";
const APP_TITLE_TEMPLATE = "%s - Bask Santa";
const APP_DESCRIPTION = 'App to score basket stats 3x3 match.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: [
    {
      url: "/icons/favicon-16x16.png",
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
    },
    {
      url: "/icons/favicon-32x32.png",
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
    },
    { rel: "apple-touch-icon", url: "https://example.com/apple-icon.png" }
  ],
  other: { charSet: 'utf-8' }
}


export const viewport: Viewport = {
  themeColor: '#d3acfe',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Navigation />

          <div className='min-h-screen bg-purple-200'>
            <Sidebar />
            <div className='main-content'>
              {/* {children} */}
            </div>
          </div>
          {/* <TeamsProvider><div className='min-h-screen bg-purple-200 pt-2 pb-3 px-3'>{children}</div></TeamsProvider> */}
        </body>
      </html>
    </>
  )
}
