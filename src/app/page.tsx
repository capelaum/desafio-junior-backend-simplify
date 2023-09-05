import { AvatarProfile } from '@/components/AvatarProfile'
import { ButtonSignIn } from '@/components/ButtonSignIn'
import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { TaskItem } from '@/components/TaskItem'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getAuthSession } from '@/lib/auth'
import { CheckCheck } from 'lucide-react'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify To-Do
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <Separator />

      <div className="container py-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          {session ? (
            <>
              <AvatarProfile session={session} />
              <FormCreateTask />
            </>
          ) : (
            <ButtonSignIn />
          )}
        </div>

        <section className="mt-8 flex flex-col">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
              Tarefas criadas
              <Badge variant="secondary">0</Badge>
            </span>

            <span className="flex items-center gap-3 font-medium text-violet-500 dark:text-violet-400">
              Concluídas
              <Badge variant="secondary">0</Badge>
            </span>
          </div>
        </section>

        <Separator className="mt-4" />

        {/* <section className="mt-12 flex flex-col items-center">
          <ClipboardList className="mb-6 h-16 w-16 text-muted-foreground" />

          <span className="text-center text-sm font-semibold text-muted-foreground md:text-lg">
            Você ainda não tem tarefas cadastradas
          </span>

          <span className="text-center text-sm text-muted-foreground md:text-lg">
            Crie tarefas e organize seus itens a fazer
          </span>
        </section> */}

        <section className="mt-6 flex flex-col items-center gap-2">
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </section>
      </div>
    </main>
  )
}
