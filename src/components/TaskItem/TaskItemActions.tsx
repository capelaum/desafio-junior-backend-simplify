import { cn } from '@/lib/utils'
import { Flag, PenSquare, Trash2 } from 'lucide-react'
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
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

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

type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW' | null

interface TaskItemActionsProps {
  priority: Priority
}

export function TaskItemActions({ priority }: TaskItemActionsProps) {
  return (
    <div className="flex items-center gap-1 rounded-md">
      {priority && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Flag
                className={cn('mr-2 h-4 w-4', priorities[priority].color)}
              />
            </TooltipTrigger>

            <TooltipContent>{priorities[priority].text}</TooltipContent>
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
              Essa ação é irreversível, sua tarefa será excluída permanentemente
              e portanto não poderá ser recuperada.
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
  )
}
