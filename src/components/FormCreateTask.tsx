'use client'

import { useTaskMutations } from '@/lib/tasks/api'
import { taskPrioritiesSelect } from '@/lib/tasks/data'
import { TaskFormSchema, taskFormSchema } from '@/lib/tasks/schemas'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flag, FlagOff, Plus } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
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

export function FormCreateTask() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { toast } = useToast()

  const { createTaskMutation, isTaskMutationLoading } = useTaskMutations()

  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: undefined
    }
  })

  const { watch, reset } = form

  const isDisabled =
    !watch('title') || !watch('description') || isTaskMutationLoading

  async function handleCreateTask(data: TaskFormSchema) {
    try {
      const { title, description, priority } = data

      await createTaskMutation.mutateAsync({
        title,
        description,
        priority
      })

      toast({
        title: '✅ Tarefa criada com sucesso!'
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
            onSubmit={form.handleSubmit(handleCreateTask)}
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

            <Button type="submit" disabled={isDisabled}>
              Criar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
