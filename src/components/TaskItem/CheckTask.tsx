import { useTaskMutations } from '@/lib/tasks/api'
import { Task } from '@/types/task'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { toast } from '../ui/use-toast'

interface CheckTasProps {
  task: Task
}

export function CheckTask({ task }: CheckTasProps) {
  const { checkTaskMutation, isTaskMutationLoading } = useTaskMutations()

  async function handleCheckTask() {
    try {
      await checkTaskMutation.mutateAsync({
        taskId: task.id,
        done: !task.done
      })
    } catch (error) {
      console.error('💥 ~ error:', error)

      toast({
        title: '❌ Ocorreu um erro ao criar a tarefa',
        description: 'Por favor tente novamente mais tarde',
        variant: 'destructive'
      })
    }
  }

  return (
    <div
      className="peer flex items-center gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        id={task.id}
        checked={task.done}
        disabled={isTaskMutationLoading}
        onCheckedChange={handleCheckTask}
      />

      <Label
        htmlFor={task.id}
        className="text-md pt-0.5 hover:cursor-pointer peer-data-[state='checked']:line-through"
      >
        {task.title}
      </Label>
    </div>
  )
}