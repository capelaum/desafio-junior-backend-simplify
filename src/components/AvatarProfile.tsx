'use client'

import { getUserNameInitials } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

export function AvatarProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const session = useSession()

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
        <AvatarImage src={session?.data?.user?.avatar_url} />
        <AvatarFallback>
          {getUserNameInitials(session?.data?.user?.name ?? '')}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">
          {session?.data?.user?.name}
        </span>

        <span className="text-xs text-muted-foreground">
          {session?.data?.user?.email}
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
