import { cn } from '@/lib/utils'
import { Flag, PenSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

export function TaskItem() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-lg border bg-card px-4 py-2 text-card-foreground shadow-lg transition-all duration-200 hover:cursor-pointer hover:border-violet-500',
        isExpanded && 'pb-4 pt-2'
      )}
      onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div
          className="peer flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox id="1" />

          <label
            htmlFor="1"
            className="text-lg font-medium leading-snug hover:cursor-pointer peer-data-[state='checked']:line-through"
          >
            Título da Tarefa
          </label>
        </div>

        <div className="flex items-center gap-1 rounded-md">
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Flag className="mr-2 h-4 w-4 text-yellow-500" />
              </TooltipTrigger>

              <TooltipContent>Alta</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            title="Editar"
            onClick={(e) => e.stopPropagation()}
          >
            <PenSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title="Excluir"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer excluir essa tarefa?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Essa ação é irreversível, sua tarefa será excluída
                  permanentemente e portanto não poderá ser recuperada.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Sim, Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div
        className={cn(
          'h-0 text-muted-foreground opacity-0 transition-all duration-200',
          isExpanded && 'mt-4 h-full opacity-100'
        )}
      >
        <p className="text-muted-foreground">Minha Descrição</p>
      </div>
    </div>
  )
}
