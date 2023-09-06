import { useTaskMutations } from '@/lib/tasks/api'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task'
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
import { toast } from '../ui/use-toast'

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

interface TaskItemActionsProps {
  task: Task
}

export function TaskItemActions({ task }: TaskItemActionsProps) {
  const { deleteTaskMutation, isTaskMutationLoading } = useTaskMutations()

  async function handleDeleteTask() {
    try {
      await deleteTaskMutation.mutateAsync(task.id)

      toast({
        title: '✅ Tarefa excluída com sucesso!'
      })
    } catch (error) {
      console.error('💥 ~ error:', error)

      toast({
        title: '❌ Ocorreu um erro ao excluir a tarefa',
        description: 'Por favor tente novamente mais tarde',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-md">
      {task.priority && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Flag
                className={cn('mr-2 h-4 w-4', priorities[task.priority].color)}
              />
            </TooltipTrigger>

            <TooltipContent>{priorities[task.priority].text}</TooltipContent>
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
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDeleteTask()}
              disabled={isTaskMutationLoading}
            >
              Sim, Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
