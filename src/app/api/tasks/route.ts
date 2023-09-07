import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { taskSchema } from '@/lib/tasks/schemas'
import { formatDatetimeToBrazilianFormat } from '@/lib/utils'
import { NextResponse } from 'next/server'

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
    const { id, user_id, title, description, done, priority, updated_at } = task

    return {
      id: id,
      userId: user_id,
      title,
      description,
      done,
      priority,
      updatedAt: formatDatetimeToBrazilianFormat(updated_at)
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

  const { title, description, priority } = taskSchema.parse({
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
