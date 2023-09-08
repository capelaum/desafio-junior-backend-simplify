'use client'

import { getUserNameInitials } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

interface AvatarProfileProps {
  user: {
    name: string
    email: string
    avatar_url: string | null
  }
}

export function AvatarProfile({ user }: AvatarProfileProps) {
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
      console.error('💥 ~ error:', error)

      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao fazer logout com o Github',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {user.avatar_url && <AvatarImage src={user.avatar_url} />}
        <AvatarFallback>{getUserNameInitials(user.name ?? '')}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">{user.name}</span>

        <span className="text-xs text-muted-foreground">{user.email}</span>
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
