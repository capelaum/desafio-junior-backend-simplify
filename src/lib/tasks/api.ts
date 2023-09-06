import {
  CreateTaskRequest,
  FetchTasksResponse,
  UpdateTaskRequest
} from '@/types/task'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../api'

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

export function useTaskMutations() {
  const [isTaskMutationLoading, setIsTaskMutationLoading] = useState(false)

  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: async ({ title, description, priority }: CreateTaskRequest) => {
      setIsTaskMutationLoading(true)

      const response = await api.post('/tasks', {
        title,
        description,
        priority
      })

      if (response.status !== 201) {
        throw new Error('Error creating task')
      }

      const { data } = response

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
    onError: (error) => {
      console.error('💥 ~ error:', error)
    },
    onSettled: () => {
      setIsTaskMutationLoading(false)
    }
  })

  const updateTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      title,
      description,
      priority
    }: UpdateTaskRequest) => {
      setIsTaskMutationLoading(true)

      const response = await api.put(`/tasks/${taskId}`, {
        title,
        description,
        priority
      })

      if (response.status !== 204) {
        throw new Error('Error updating task')
      }

      const { data } = response

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
    onError: (error) => {
      console.error('💥 ~ error:', error)
    },
    onSettled: () => {
      setIsTaskMutationLoading(false)
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      setIsTaskMutationLoading(true)

      const response = await api.delete(`/tasks/${taskId}`)

      if (response.status !== 204) {
        throw new Error('Error deleting task')
      }

      const { data } = response

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
    onError: (error) => {
      console.error('💥 ~ error:', error)
    },
    onSettled: () => {
      setIsTaskMutationLoading(false)
    }
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    isTaskMutationLoading,
    setIsTaskMutationLoading
  }
}
