'use client'

import { cn } from '@/lib/utils'
import { Flag, PenSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

const priorities = {
  URGENT: {
    text: 'Urgente',
    color: 'text-red-500'
  },
  HIGH: {
    text: 'Alta',
    color: 'text-yellow-500'
  },
  NORMAL: {
    text: 'Normal',
    color: 'text-cyan-600 dark:text-cyan-400'
  },
  LOW: {
    text: 'Urgente',
    color: 'text-gray-500 dark:text-gray-200'
  }
}

type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'

type Task = {
  id: string
  title: string
  description: string
  done: boolean
  priority?: Priority | null
}

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-lg border bg-card px-4 py-2 text-card-foreground shadow-lg transition-all duration-200 hover:cursor-pointer hover:border-violet-500',
        isExpanded && 'pb-4 pt-2'
      )}
      onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div
          className="peer flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox id={task.id} checked={task.done} />

          <label
            htmlFor={task.id}
            className="text-md font-medium leading-none hover:cursor-pointer peer-data-[state='checked']:line-through"
          >
            {task.title}
          </label>
        </div>

        <div className="flex items-center gap-1 rounded-md">
          {task.priority && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Flag
                    className={cn(
                      'mr-2 h-4 w-4',
                      priorities[task.priority].color
                    )}
                  />
                </TooltipTrigger>

                <TooltipContent>
                  {priorities[task.priority].text}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Button
            variant="ghost"
            size="icon"
            title="Editar"
            onClick={(e) => e.stopPropagation()}
          >
            <PenSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title="Excluir"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer excluir essa tarefa?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Essa ação é irreversível, sua tarefa será excluída
                  permanentemente e portanto não poderá ser recuperada.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Sim, Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div
        className={cn(
          'h-0 text-muted-foreground opacity-0 transition-all duration-200',
          isExpanded && 'mt-4 h-full opacity-100'
        )}
      >
        <p className="whitespace-pre-line text-muted-foreground">
          {task.description}
        </p>
      </div>
    </div>
  )
}
