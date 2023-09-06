'use client'

import { cn } from '@/lib/utils'
import { Task } from '@/types/task'
import { useState } from 'react'
import { AlertDialogDeleteTask } from './AlertDialogDeleteTask'
import { CheckTask } from './CheckTask'
import { FormUpdateTask } from './FormUpdateTask'
import { TooltipFlag } from './TooltipFlag'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-lg border bg-card px-4 py-2 text-card-foreground shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-violet-400/50 dark:hover:shadow-violet-900/50',
        isExpanded && ''
      )}
      onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <CheckTask task={task} />

        <div className="flex items-center gap-1 rounded-md">
          {task.priority && <TooltipFlag priority={task.priority} />}
          <FormUpdateTask task={task} />
          <AlertDialogDeleteTask taskId={task.id} />
        </div>
      </div>

      <div
        className={cn(
          'h-0 text-muted-foreground opacity-0 transition-all duration-300 ease-linear sm:ml-8 ',
          isExpanded && 'mt-2 h-full opacity-100'
        )}
      >
        <p
          className={cn(
            'h-0 whitespace-pre-line text-sm font-normal leading-relaxed text-muted-foreground opacity-0',
            isExpanded && 'h-full opacity-100'
          )}
        >
          {task.description}
        </p>
      </div>
    </div>
  )
}
