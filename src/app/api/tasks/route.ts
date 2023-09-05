import { getAuthSession } from '@/lib/auth'
import { createTask, fetchTasks } from '@/lib/tasks/api'
import { NextResponse } from 'next/server'

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

export async function POST(req: Request, res: Response) {
  const request = await req.json()
  console.log('💥 ~ request:', request)

  const { userId, title, description } = request

  const response = await createTask({
    userId,
    title,
    description,
    priority: request.priority
  })

  return NextResponse.json({ response })
}
