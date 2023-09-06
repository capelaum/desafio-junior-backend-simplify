import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession()
  const taskId = params.id

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

  await db.task.delete({
    where: {
      user_id: session.user.id,
      id: taskId
    }
  })

  return new Response(null, {
    status: 204
  })
}

const updateTaskSchema = z.object({
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession()
  const taskId = params.id

  const body = await req.json()

  const { title, description, priority } = updateTaskSchema.parse({
    title: body.title,
    description: body.description,
    priority: body.priority
  })

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

  await db.task.update({
    where: {
      id: taskId,
      user_id: session.user.id
    },
    data: {
      title,
      description,
      priority: priority ?? null
    }
  })

  return new Response(null, {
    status: 204
  })
}
