import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCheck } from 'lucide-react'

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
          <div className="flex justify-between">
            <span className="flex items-center gap-3 font-medium text-primary">
              Tarefas criadas
              <Badge variant="secondary">0</Badge>
            </span>

            <span className="flex items-center gap-3 font-medium text-primary">
              Concluídas
              <Badge variant="secondary">0</Badge>
            </span>
          </div>

          <Separator className="mt-4" />
        </section>
      </div>
    </main>
  )
}
