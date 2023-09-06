import { Task } from '@/types/task'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

interface CheckTasProps {
  task: Task
}

export function CheckTask({ task }: CheckTasProps) {
  return (
    <div
      className="peer flex items-center gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox id={task.id} checked={task.done} />

      <Label
        htmlFor={task.id}
        className="text-md pt-0.5 hover:cursor-pointer peer-data-[state='checked']:line-through"
      >
        {task.title}
      </Label>
    </div>
  )
}
