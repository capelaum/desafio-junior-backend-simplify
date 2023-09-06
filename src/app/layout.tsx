import '@/styles/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from './providers'

const roboto = localFont({
  src: [
    {
      path: '../assets/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Roboto-Medium.ttf',
      weight: '400',
      style: 'medium'
    },
    {
      path: '../assets/fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-roboto',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Simplify ToDo',
  description: 'Simplify ToDo'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={roboto.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
