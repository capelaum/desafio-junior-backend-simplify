'use client'

import { useTasks } from '@/lib/tasks/api'
import { ClipboardList } from 'lucide-react'
import { TaskItem } from './TaskItem'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

export function TaskList() {
  const { isLoading, data } = useTasks()

  if (isLoading) {
    return <TaskListSkeleton />
  }

  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
          Tarefas criadas
          <Badge variant="secondary">{data?.tasks.length ?? 0}</Badge>
        </span>

        <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
          Concluídas
          <Badge variant="secondary">{data?.numberOfCompletedTasks ?? 0}</Badge>
        </span>
      </div>

      <Separator className="mt-4" />

      {data?.tasks.length === 0 && (
        <section className="mt-12 flex flex-col items-center">
          <ClipboardList className="mb-6 h-16 w-16 text-muted-foreground" />

          <span className="text-center text-sm font-semibold text-muted-foreground md:text-lg">
            Você ainda não tem tarefas cadastradas
          </span>

          <span className="text-center text-sm text-muted-foreground md:text-lg">
            Crie tarefas e organize seus itens a fazer
          </span>
        </section>
      )}

      <section className="mt-4 flex flex-col items-center gap-3">
        {data?.tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </section>
    </section>
  )
}

export function TaskListSkeleton() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
          Tarefas criadas
          <Skeleton className="h-5 w-7 animate-pulse rounded-full" />
        </span>

        <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
          Concluídas
          <Skeleton className="h-5 w-7 animate-pulse rounded-full" />
        </span>
      </div>

      <Separator className="mt-4" />

      <section className="mt-4 flex flex-col items-center gap-4">
        <Skeleton className="h-[58px] w-full animate-pulse rounded-lg shadow-md" />
        <Skeleton className="h-[58px] w-full animate-pulse rounded-lg shadow-md" />
        <Skeleton className="h-[58px] w-full animate-pulse rounded-lg shadow-md" />
      </section>
    </section>
  )
}
