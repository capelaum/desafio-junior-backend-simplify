'use client'

import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SessionProvider>
      {!mounted ? (
        children
      ) : (
        <ThemeProvider attribute="class" storageKey="@simplify-todo:theme">
          {children}
          <Toaster />
        </ThemeProvider>
      )}
    </SessionProvider>
  )
}
