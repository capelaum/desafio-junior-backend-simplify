import { Priority } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export type Task = {
  id: string
  title: string
  description: string
  done: boolean
  priority: Priority
}

type FetchTasksResponse = {
  tasks: Task[]
  numberOfCompletedTasks: number
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<FetchTasksResponse> => {
      const {
        data: { tasks, numberOfCompletedTasks }
      } = await api('/tasks')

      return { tasks, numberOfCompletedTasks }
    }
  })
}
