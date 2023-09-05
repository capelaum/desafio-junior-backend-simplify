'use client'

import { getUserNameInitials } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

interface AvatarProfileProps {
  session: Session | null
}

export function AvatarProfile({ session }: AvatarProfileProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      await signOut()

      toast({
        title: 'Logout realizado com sucesso!',
        description: 'Esperamos te ver em breve 👋'
      })
    } catch (error) {
      console.log('💥 ~ error:', error)
      toast({
        title: 'Error',
        description: 'Ocorreu um erro ao fazer login com o Github',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={session?.user?.avatar_url} />
        <AvatarFallback>
          {getUserNameInitials(session?.user?.name ?? '')}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">{session?.user?.name}</span>

        <span className="text-xs text-muted-foreground">
          {session?.user?.email}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        title="Sair"
        disabled={isLoading}
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5 text-destructive" />
      </Button>
    </div>
  )
}
