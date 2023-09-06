import { AvatarProfile } from '@/components/AvatarProfile'
import { ButtonSignIn } from '@/components/ButtonSignIn'
import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { TaskList } from '@/components/TaskList'
import { getAuthSession } from '@/lib/auth'
import { CheckCheck, LogIn } from 'lucide-react'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <main className="min-h-screen">
      <div className="container flex flex-col gap-12 pb-6 pt-10">
        <header className="flex items-center justify-between">
          <h1 className="flex scroll-m-20 items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            <CheckCheck className="h-8 w-8" />
            Symplify ToDo
          </h1>

          <ButtonToggleTheme />
        </header>

        <section className="flex flex-col justify-between gap-6 sm:flex-row">
          {session ? (
            <>
              <AvatarProfile user={session.user} />
              <FormCreateTask />
            </>
          ) : (
            <ButtonSignIn />
          )}
        </section>

        {!session && (
          <section className="flex flex-col items-center">
            <LogIn className="mb-6 h-16 w-16 text-muted-foreground" />

            <span className="text-center text-sm font-semibold text-muted-foreground md:text-lg">
              Faça login para gerenciar suas tarefas
            </span>

            <span className="text-center text-sm text-muted-foreground md:text-lg">
              Você pode fazer login com sua conta do github
            </span>
          </section>
        )}

        {session && <TaskList />}
      </div>
    </main>
  )
}
