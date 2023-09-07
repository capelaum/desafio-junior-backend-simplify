export type Priority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW' | null | undefined

export type Task = {
  id: string
  title: string
  description: string
  done: boolean
  priority: Priority
  updatedAt: string
}

export type CreateTaskRequest = Omit<Task, 'id' | 'done'>

export type UpdateTaskRequest = CreateTaskRequest & {
  taskId: string
}

export type FetchTasksResponse = {
  tasks: Task[]
  numberOfCompletedTasks: number
}
