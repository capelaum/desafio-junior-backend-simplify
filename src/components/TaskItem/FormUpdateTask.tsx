'use client'

import { useTaskMutations } from '@/lib/tasks/api'
import { taskPrioritiesSelect } from '@/lib/tasks/data'
import { TaskFormSchema, taskFormSchema } from '@/lib/tasks/schemas'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flag, FlagOff, Info, PenSquare } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import { useToast } from '../ui/use-toast'

interface FormUpdateTaskProps {
  task: Task
}

export function FormUpdateTask({ task }: FormUpdateTaskProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { toast } = useToast()

  const { updateTaskMutation, isTaskMutationLoading } = useTaskMutations()

  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority ?? undefined
    }
  })

  const { watch, reset, setValue } = form

  useEffect(() => {
    setValue('title', task.title)
    setValue('description', task.description)
    setValue('priority', task.priority ?? undefined)
  }, [task, setValue])

  const isDisabled =
    !watch('title') || !watch('description') || isTaskMutationLoading

  async function handleUpdateTask(data: TaskFormSchema) {
    try {
      const { title, description, priority } = data

      await updateTaskMutation.mutateAsync({
        taskId: task.id,
        title,
        description,
        priority
      })

      toast({
        title: '✅ Tarefa atualizada com sucesso!'
      })

      toast({
        title: 'Tarefa atualizada!',
        description: (
          <div className="mt-2 flex items-center gap-2 ">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            <span className="leading-none">Feito</span>
          </div>
        )
      })

      reset()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('💥 ~ error:', error)

      toast({
        title: '❌ Ocorreu um erro ao atualizar a tarefa',
        description: 'Por favor tente novamente mais tarde',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Editar"
          onClick={(e) => e.stopPropagation()}
        >
          <PenSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </Button>
      </DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateTask)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Título
                    <span className="ml-1 text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Título da tarefa" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descrição
                    <span className="ml-1 text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[400px] min-h-[100px] font-normal"
                      placeholder="Descrição da tarefa"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma prioridade" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {taskPrioritiesSelect.map((priority) => (
                        <Fragment key={priority.value}>
                          {priority.value === '' && <Separator />}

                          <SelectItem value={priority.value}>
                            <span className="flex items-center gap-3">
                              {priority.value === '' ? (
                                <FlagOff
                                  className={cn('h-4 w-4', priority.color)}
                                />
                              ) : (
                                <Flag
                                  className={cn('h-4 w-4', priority.color)}
                                />
                              )}
                              {priority.text}
                            </span>
                          </SelectItem>
                        </Fragment>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isDisabled}
              onClick={(e) => e.stopPropagation()}
            >
              Editar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
