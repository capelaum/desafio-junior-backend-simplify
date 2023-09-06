import { getAuthSession } from '@/lib/auth'
import { fetchTasks } from '@/lib/tasks/api'
import { ClipboardList } from 'lucide-react'
import { TaskItem } from './TaskItem'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

export async function TaskList() {
  const session = await getAuthSession()
  const { tasks, numberOfCompletedTasks } = await fetchTasks(session?.user?.id!)

  return (
    <>
      <section className="mt-8 flex flex-col">
        <div className="flex flex-col justify-between gap-5 sm:flex-row">
          <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
            Tarefas criadas
            <Badge variant="secondary">{tasks?.length ?? 0}</Badge>
          </span>

          <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
            Concluídas
            <Badge variant="secondary">{numberOfCompletedTasks ?? 0}</Badge>
          </span>
        </div>
      </section>

      <Separator className="mt-4" />

      {tasks?.length === 0 && (
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

      <section className="mt-6 flex flex-col items-center gap-2">
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </section>
    </>
  )
}
