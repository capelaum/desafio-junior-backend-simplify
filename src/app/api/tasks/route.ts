import { getAuthSession } from '@/lib/auth'
import { createTask, fetchTasks } from '@/lib/tasks/api'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request, res: Response) {
  const session = await getAuthSession()
  console.log('💥 ~ session:', session)

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    )
  }

  return fetchTasks(session)
}

const createTaskSchema = z.object({
  userId: z.string({
    required_error: 'ID do usuário é obrigatório',
    invalid_type_error: 'ID do usuário deve ser um texto'
  }),
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

export async function POST(req: Request) {
  const request = await req.json()

  const { userId, title, description, priority } = createTaskSchema.parse({
    userId: request.userId,
    title: request.title,
    description: request.description,
    priority: request.priority
  })

  const response = await createTask({
    userId,
    title,
    description,
    priority
  })

  return NextResponse.json(response, {
    status: 201
  })
}
