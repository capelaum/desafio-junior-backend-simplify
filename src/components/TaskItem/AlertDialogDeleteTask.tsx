import { useTaskMutations } from '@/lib/tasks/api'
import { Trash2 } from 'lucide-react'
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
import { toast } from '../ui/use-toast'

interface AlertDialogDeleteTaskProps {
  taskId: string
}

export function AlertDialogDeleteTask({ taskId }: AlertDialogDeleteTaskProps) {
  const { deleteTaskMutation, isTaskMutationLoading } = useTaskMutations()

  async function handleDeleteTask() {
    try {
      await deleteTaskMutation.mutateAsync(taskId)

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
            Essa ação é irreversível, sua tarefa será excluída permanentemente e
            portanto não poderá ser recuperada.
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
  )
}
