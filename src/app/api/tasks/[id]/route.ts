import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

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
