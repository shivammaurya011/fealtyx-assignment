import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '@/store/services/taskApi';

export const useTasks = () => {
  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery(undefined, {
    pollingInterval: 60000, // Refresh every minute
  });
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  return {
    tasks,
    isLoading,
    error,
    refetch,
    createTask,
    updateTask,
    deleteTask,
  };
};