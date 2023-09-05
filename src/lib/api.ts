import axios from 'axios'
import { Session } from 'next-auth'
import { db } from './db'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000/api'
})

export async function fetchTasks(session: Session) {
  try {
    const { user } = session

    const tasks = await db.task.findMany({
      where: {
        user_id: user.id
      },
      orderBy: {
        created_at: 'desc'
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
      message: 'Could not fetch books',
      status: 500
    }
  }
}
