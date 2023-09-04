import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { FormCreateTask } from '@/components/FormCreateTask'
import { CheckCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center border-b border-b-slate-700 py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify Tarefas
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <div className="container py-6">
        <FormCreateTask />
      </div>
    </main>
  )
}
