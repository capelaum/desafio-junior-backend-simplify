import { cn } from '@/lib/utils'
import { Eye, PenSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { DialogTrigger } from './ui/dialog'

export function TaskItem() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="group flex w-full flex-col justify-between gap-3 rounded-md bg-slate-200 px-4 py-4 shadow-lg dark:bg-slate-900 sm:flex-row sm:items-center sm:gap-3 sm:py-2">
      <div className="flex items-center gap-3">
        <Checkbox
          id="1"
          checked={checked}
          onCheckedChange={() => setChecked((checked) => !checked)}
        />

        <label
          htmlFor="1"
          className={cn(
            'text-md font-medium leading-none hover:cursor-pointer md:text-lg',
            checked ? 'line-through' : ''
          )}
        >
          Título da Tarefa
        </label>
      </div>

      <div className="ml-auto flex items-center gap-2 rounded-md">
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Ver Detalhes">
            <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </DialogTrigger>

        <Button variant="ghost" size="icon" title="Editar">
          <PenSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>

        <Button variant="ghost" size="icon" title="Excluir">
          <Trash2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>
    </div>
  )
}
