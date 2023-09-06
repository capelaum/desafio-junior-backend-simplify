export type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW' | null | undefined

export type Task = {
  id: string
  title: string
  description: string
  done: boolean
  priority: Priority
}

type CreateTaskRequest = Omit<Task, 'id' | 'done'>
