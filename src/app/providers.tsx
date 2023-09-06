'use client'

import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {!mounted ? (
          children
        ) : (
          <ThemeProvider attribute="class" storageKey="@simplify-todo:theme">
            {children}
          </ThemeProvider>
        )}
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  )
}
