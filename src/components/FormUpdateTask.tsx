'use client'

import { useTaskMutations } from '@/lib/tasks/api'
import { Task } from '@/types/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ban, Flag, PenSquare } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'

const taskPriorities = [
  {
    value: 'URGENT',
    text: 'Urgente',
    icon: <Flag className="h-4 w-4 text-red-500" />
  },
  {
    value: 'HIGH',
    text: 'Alta',
    icon: <Flag className="h-4 w-4 text-yellow-500" />
  },
  {
    value: 'NORMAL',
    text: 'Normal',
    icon: <Flag className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
  },
  {
    value: 'LOW',
    text: 'Baixa',
    icon: <Flag className="h-4 w-4 text-gray-500 dark:text-gray-200" />
  },
  {
    value: '',
    text: 'Nenhuma',
    icon: <Ban className="h-4 w-4 text-gray-400" />
  }
]

const updateTaskFormSchema = z.object({
  title: z
    .string({
      required_error: 'Título é obrigatório',
      invalid_type_error: 'Título da tarefa deve ser um texto'
    })
    .trim()
    .min(2, {
      message: 'Título deve ter no mínimo 2 caracteres'
    })
    .max(100, {
      message: 'Título deve ter no máximo 100 caracteres'
    }),
  description: z
    .string({
      required_error: 'Descrição é obrigatória',
      invalid_type_error: 'Descrição da tarefa deve ser um texto'
    })
    .trim()
    .min(2, {
      message: 'Descrição deve ter no mínimo 2 caracteres'
    })
    .max(1000, {
      message: 'Descrição deve ter no máximo 1000 caracteres'
    }),
  priority: z
    .enum(['URGENT', 'HIGH', 'NORMAL', 'LOW', ''], {
      invalid_type_error: 'Prioridade inválida',
      required_error: 'Prioridade inválida'
    })
    .optional()
    .transform((value) => {
      if (value === '') {
        return undefined
      }

      return value
    })
})

type UpdateTaskFormSchema = z.infer<typeof updateTaskFormSchema>

interface FormUpdateTaskProps {
  task: Task
}

export function FormUpdateTask({ task }: FormUpdateTaskProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { toast } = useToast()

  const { updateTaskMutation, isTaskMutationLoading } = useTaskMutations()

  const form = useForm<UpdateTaskFormSchema>({
    resolver: zodResolver(updateTaskFormSchema),
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

  async function handleUpdateTask(data: UpdateTaskFormSchema) {
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

      reset()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('💥 ~ error:', error)

      toast({
        title: '❌ Ocorreu um erro ao criar a tarefa',
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
                  <FormLabel>Título*</FormLabel>
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
                  <FormLabel>Descrição*</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[400px] min-h-[100px]"
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
                      {taskPriorities.map((priority) => (
                        <Fragment key={priority.value}>
                          {priority.value === '' && <Separator />}

                          <SelectItem value={priority.value}>
                            <span className="flex items-center gap-3">
                              {priority.icon}
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
