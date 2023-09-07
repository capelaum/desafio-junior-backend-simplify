'use client'

import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

export function ButtonSignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      await signIn('github')

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem-vindo ao Simplify ToDo'
      })
    } catch (error) {
      console.error('💥 ~ error:', error)

      toast({
        title: 'Error',
        description: 'Ocorreu um erro ao fazer login com o github',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="default"
      title="Entrar com Github"
      onClick={handleLogin}
      disabled={isLoading}
    >
      <Github className="mr-2 h-5 w-5" />
      Entrar com Github
    </Button>
  )
}
