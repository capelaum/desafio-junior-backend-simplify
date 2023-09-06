import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { taskSchema } from '@/lib/tasks/schemas'
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const taskId = params.id

  const body = await req.json()

  const { title, description, priority } = taskSchema.parse({
    title: body.title,
    description: body.description,
    priority: body.priority
  })

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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const taskId = params.id

  const body = await req.json()

  const { done } = z
    .object({
      done: z.boolean({
        required_error: 'Feito é obrigatório',
        invalid_type_error: 'Feito deve ser um verdadeiro ou falso'
      })
    })
    .parse({
      done: body.done
    })

  await db.task.update({
    where: {
      id: taskId,
      user_id: session.user.id
    },
    data: {
      done
    }
  })

  return new Response(null, {
    status: 204
  })
}
