'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task'
import { useState } from 'react'
import { Label } from '../ui/label'
import { TaskItemActions } from './TaskItemActions'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-lg border bg-card px-4 py-2 text-card-foreground shadow-lg hover:cursor-pointer hover:border-violet-500',
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

          <Label
            htmlFor={task.id}
            className="text-md pt-0.5 hover:cursor-pointer peer-data-[state='checked']:line-through"
          >
            {task.title}
          </Label>
        </div>

        <TaskItemActions task={task} />
      </div>

      <div
        className={cn(
          'h-0 text-muted-foreground opacity-0 transition-all duration-300 ease-linear sm:ml-8 ',
          isExpanded && 'mt-2 h-full opacity-100'
        )}
      >
        <p
          className={cn(
            'h-0 whitespace-pre-line leading-relaxed text-muted-foreground opacity-0',
            isExpanded && 'h-full opacity-100'
          )}
        >
          {task.description}
        </p>
      </div>
    </div>
  )
}
