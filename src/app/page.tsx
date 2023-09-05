'use client'

import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { TaskItem } from '@/components/TaskItem'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { CheckCheck, Github } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const { data: session, status } = useSession()
  console.log('💥 ~ status:', status)
  console.log('💥 ~ session:', session)

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      await signIn('github')

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem-vindo ao Simplify ToDo'
      })
    } catch (error) {
      console.log('💥 ~ error:', error)
      toast({
        title: 'Error',
        description: `Ocorreu um erro ao fazer login com o github `
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify To-Do
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <Separator />

      <div className="container py-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Button
            variant="outline"
            title="Entrar com Github"
            onClick={handleLogin}
            disabled={isLoading}
          >
            <Github className="mr-2 h-5 w-5" />
            Entrar com Github
          </Button>

          <FormCreateTask />
        </div>

        <section className="mt-8 flex flex-col">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
              Tarefas criadas
              <Badge variant="secondary">0</Badge>
            </span>

            <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
              Concluídas
              <Badge variant="secondary">0</Badge>
            </span>
          </div>
        </section>

        <Separator className="mt-4" />

        {/* <section className="mt-12 flex flex-col items-center">
          <ClipboardList className="mb-6 h-16 w-16 text-muted-foreground" />

          <span className="text-center text-sm font-semibold text-muted-foreground md:text-lg">
            Você ainda não tem tarefas cadastradas
          </span>

          <span className="text-center text-sm text-muted-foreground md:text-lg">
            Crie tarefas e organize seus itens a fazer
          </span>
        </section> */}

        <section className="mt-6 flex flex-col items-center gap-2">
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </section>
      </div>
    </main>
  )
}
