import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCheck, ClipboardList } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify Tarefas
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <Separator />

      <div className="container py-6">
        <FormCreateTask />

        <section className="mt-8 flex flex-col">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <span className="flex items-center gap-3 font-medium text-primary">
              Tarefas criadas
              <Badge variant="secondary">0</Badge>
            </span>

            <span className="flex items-center gap-3 font-medium text-primary">
              Concluídas
              <Badge variant="secondary">0</Badge>
            </span>
          </div>
        </section>

        <Separator className="mb-12 mt-4" />

        <section className="flex flex-col items-center">
          <ClipboardList className="mb-6 h-16 w-16 text-muted-foreground" />

          <span className="text-center text-sm font-semibold text-muted-foreground md:text-lg">
            Você ainda não tem tarefas cadastradas
          </span>

          <span className="text-center text-sm text-muted-foreground md:text-lg">
            Crie tarefas e organize seus itens a fazer
          </span>
        </section>
      </div>
    </main>
  )
}
