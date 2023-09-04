'use client'

import { ButtonToggleTheme } from '@/components/ButtonToggleTheme'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCheck, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  title: z
    .string({
      required_error: 'Título é obrigatório',
      invalid_type_error: 'Título da tarefa deve ser um texto.'
    })
    .trim()
    .min(2, {
      message: 'Título deve ter no mínimo 2 caracteres'
    })
    .max(100, {
      message: 'Título deve ter no máximo 100 caracteres'
    })
})

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { watch, reset } = form

  const isDisabled = !watch('title')

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <main className="min-h-screen">
      <div className="relative flex items-center justify-center border-b border-b-slate-700 py-20">
        <h1 className="flex scroll-m-20 items-center gap-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <CheckCheck className="h-8 w-8" />
          Symplify Todo
        </h1>
        <div className="absolute right-4 top-4 z-10">
          <ButtonToggleTheme />
        </div>
      </div>

      <div className="container py-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
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
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da tarefa*</FormLabel>
                      <FormControl>
                        <Input placeholder="Título" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isDisabled}>
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
