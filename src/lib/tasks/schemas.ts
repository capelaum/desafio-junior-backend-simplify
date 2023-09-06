import { z } from 'zod'

export const taskFormSchema = z.object({
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

export type TaskFormSchema = z.infer<typeof taskFormSchema>

export const taskSchema = taskFormSchema.extend({
  priority: z.enum(['URGENT', 'HIGH', 'NORMAL', 'LOW']).optional()
})
