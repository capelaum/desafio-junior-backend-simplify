'use client'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider attribute="class" storageKey="@simplify-todo:theme">
      {children}
      <Toaster />
    </ThemeProvider>
  )
}