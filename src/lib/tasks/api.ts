import { Session } from 'next-auth'
import { db } from '../db'

export async function fetchTasks(session: Session) {
  try {
    const { user } = session

    const tasks = (
      await db.task.findMany({
        where: {
          user_id: user.id
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

    return { tasks, numberOfCompletedTasks }
  } catch (error) {
    console.log('💥 ~ error:', error)

    return {
      error,
      message: 'Could not fetch tasks',
      status: 500
    }
  }
}

type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'

type CreateTaskData = {
  userId: string
  title: string
  description: string
  priority?: Priority
}

export async function createTask({
  userId,
  title,
  description,
  priority
}: CreateTaskData) {
  try {
    const createdTask = await db.task.create({
      data: {
        user_id: userId,
        title,
        description,
        priority: priority ?? null
      }
    })

    return { createdTask }
  } catch (error) {
    console.log('💥 ~ error:', error)

    return {
      error,
      message: 'Could not create task',
      status: 500
    }
  }
}
