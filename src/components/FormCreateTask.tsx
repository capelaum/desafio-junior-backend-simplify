'use client'

import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ban, Flag, Plus } from 'lucide-react'
import { Session } from 'next-auth'
import { Fragment, useState } from 'react'
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

const createTaskFormSchema = z.object({
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
  priority: z.enum(['URGENT', 'HIGH', 'NORMAL', 'LOW']).optional()
})

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>

interface FormCreateTaskProps {
  session: Session
}

export function FormCreateTask({ session }: FormCreateTaskProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: undefined
    }
  })

  const { watch, reset } = form

  const isDisabled = !watch('title') || !watch('description')

  async function onSubmit(data: CreateTaskFormSchema) {
    const { title, description, priority } = data

    const response = await api.post('/tasks', {
      userId: session.user.id,
      title,
      description,
      priority
    })

    console.log('💥 ~ response:', response)

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })

    reset()
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Criar tarefa
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isDisabled}>
              Criar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
