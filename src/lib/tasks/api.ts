import { db } from '../db'

export async function fetchTasks(userId: string) {
  try {
    const tasks = (
      await db.task.findMany({
        where: {
          user_id: userId
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
  const createdTask = await db.task.create({
    data: {
      user_id: userId,
      title,
      description,
      priority: priority ?? null
    }
  })

  return { createdTask }
}
