import { AvatarProfile } from '@/components/AvatarProfile'
import { ButtonSignIn } from '@/components/ButtonSignIn'
import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { TaskList } from '@/components/TaskList'
import { Separator } from '@/components/ui/separator'
import { getAuthSession } from '@/lib/auth'
import { CheckCheck, LogIn } from 'lucide-react'

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
              <AvatarProfile />
              <FormCreateTask />
            </>
          ) : (
            <ButtonSignIn />
          )}
        </div>

        {!session && (
          <section className="mt-12 flex flex-col items-center">
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
