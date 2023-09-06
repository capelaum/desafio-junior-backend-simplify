import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET() {
  const session = await getAuthSession()

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    )
  }

  const tasks = (
    await db.task.findMany({
      where: {
        user_id: session.user.id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  ).map((task) => {
    const { id, user_id, title, description, done, priority } = task

    return {
      id: id,
      userId: user_id,
      title,
      description,
      done,
      priority
    }
  })

  const numberOfCompletedTasks = tasks.reduce((sum, task) => {
    if (task.done) {
      sum += 1
    }

    return sum
  }, 0)

  return NextResponse.json({ tasks, numberOfCompletedTasks })
}

const createTaskSchema = z.object({
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
  const session = await getAuthSession()

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    )
  }

  const body = await req.json()

  const { title, description, priority } = createTaskSchema.parse({
    title: body.title,
    description: body.description,
    priority: body.priority
  })

  const createdTask = await db.task.create({
    data: {
      user_id: session.user.id,
      title,
      description,
      priority: priority ?? null
    }
  })

  return NextResponse.json(
    { createdTask },
    {
      status: 201
    }
  )
}
