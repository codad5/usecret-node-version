import Providers from '@/components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata : Metadata = {
  title: 'Usecrets - Anonymous messaging platform',
  description : "Receive anonymous messages from your friends and family.",
  themeColor: '#000000',
  category: "Social, Messaging",
  generator: "Usecrets",
  applicationName: "Usecrets",
  keywords: ["usecrets", "anonymous", "messaging", "platform", "social", "media", "social media", "anonymous messaging", "anonymous messaging platform", "anonymous messaging app", "anonymous messaging website", "anonymous messaging social media", "anonymous messaging social media platform"],
  colorScheme: "light dark",
  authors: [{
    name: "Chibueze",
    url: "https://codad5.me",
  }],
  creator: "Chibueze Aniezeofor",
  openGraph: {
    title: 'Usecrets - Anonymous messaging platform',
    description : "Receive anonymous messages from your friends and family.",
    url: 'https://usecret.codad5.me',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      }
    ],
    siteName: 'Usecrets',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        {children}
        <footer className='w-full text-center p-4 h-20'>
            <span>Built by Chibueze</span>
        </footer>
      </body>
      </Providers>
    </html>
  )
}
