'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { TaskItemActions } from './TaskItemActions'

type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW' | null

export type Task = {
  id: string
  title: string
  description: string
  done: boolean
  priority: Priority
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

        <TaskItemActions priority={task.priority} />
      </div>

      <div
        className={cn(
          'h-0 text-muted-foreground opacity-0 transition-all duration-200 sm:ml-8',
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
