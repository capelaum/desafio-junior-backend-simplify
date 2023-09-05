'use client'

import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { CheckCheck, Eye, Flag, PenSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [checked, setChecked] = useState(false)

  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify Tarefas
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <Separator />

      <div className="container py-6">
        <FormCreateTask />

        <section className="mt-8 flex flex-col">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <span className="flex items-center gap-3 font-medium text-primary">
              Tarefas criadas
              <Badge variant="secondary">0</Badge>
            </span>

            <span className="flex items-center gap-3 font-medium text-primary">
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

        <section className="mt-8 flex flex-col items-center">
          <Dialog>
            <div className="group flex w-full flex-col justify-between gap-3 rounded-md bg-slate-200 px-4 py-4 shadow-lg dark:bg-slate-900 sm:flex-row sm:items-center sm:gap-3 sm:py-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="1"
                  checked={checked}
                  onCheckedChange={() => setChecked((checked) => !checked)}
                />

                <label
                  htmlFor="1"
                  className={cn(
                    'text-md font-medium leading-none hover:cursor-pointer md:text-lg',
                    checked ? 'line-through' : ''
                  )}
                >
                  Título da Tarefa
                </label>
              </div>

              <div className="ml-auto flex items-center gap-2 rounded-md">
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="Ver Detalhes">
                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </DialogTrigger>

                <Button variant="ghost" size="icon" title="Editar">
                  <PenSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>

                <Button variant="ghost" size="icon" title="Excluir">
                  <Trash2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
            </div>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Título da Tarefa</DialogTitle>
                <DialogDescription className="flex items-center gap-2 pt-2">
                  <Flag className="h-5 w-5 text-yellow-500" />
                  Alta
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium">Descrição</p>
                <p className="text-md font-normal text-muted-foreground">
                  A Descrição da tarefa
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </main>
  )
}
