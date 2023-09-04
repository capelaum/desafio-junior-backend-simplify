import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { CheckCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 py-20 dark:from-sky-500 dark:to-indigo-500">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify Todo
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>
    </main>
  )
}
