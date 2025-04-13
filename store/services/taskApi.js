import { createApi } from '@reduxjs/toolkit/query/react';
import tasksData from '../../public/data/tasks.json';

let tasks = [...tasksData];

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: async ({ url, method, body }) => {
    try {
      if (method === 'GET' && url === '/tasks') {
        return { data: tasks };
      }
      if (method === 'POST' && url === '/tasks') {
        const newTask = { ...body, id: body.id || Date.now().toString() };
        tasks = [...tasks, newTask];
        return { data: newTask };
      }
      if (method === 'PUT' && url.startsWith('/tasks/')) {
        const updatedTask = body;
        const taskExists = tasks.some((t) => t.id === updatedTask.id);
        if (!taskExists) {
          throw new Error('Task not found');
        }
        tasks = tasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t));
        return { data: updatedTask };
      }
      if (method === 'DELETE' && url.startsWith('/tasks/')) {
        const id = url.split('/').pop();
        tasks = tasks.filter((t) => t.id !== id);
        return { data: { id } };
      }
      throw new Error('Unsupported operation');
    } catch (error) {
      return { error: { status: 'CUSTOM_ERROR', data: error.message } };
    }
  },
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;