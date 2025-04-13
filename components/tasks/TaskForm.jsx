'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateTaskMutation, useUpdateTaskMutation, useGetTasksQuery } from '@/store/services/taskApi';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { PRIORITIES, STATUSES } from '@/lib/constants';
import { FaTag, FaUserCircle, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function TaskForm({ task }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    status: task?.status || 'Open',
    assignee: task?.assignee || '',
    startDate: task?.startDate || '',
    dueDate: task?.dueDate || '',
    tags: task?.tags?.join(', ') || '',
  });
  const [errors, setErrors] = useState({});
  const [createTask, { isLoading: isCreating, error: createError }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery();
  const router = useRouter();

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.assignee) newErrors.assignee = 'Assignee is required';
    if (formData.startDate && formData.dueDate && new Date(formData.dueDate) < new Date(formData.startDate)) {
      newErrors.dueDate = 'Due date cannot be before start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix form errors');
      return;
    }
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      id: task?.id || Date.now().toString(),
      timeLogged: task?.timeLogged || 0,
    };
    try {
      if (task) {
        await updateTask(taskData).unwrap();
        toast.success('Task updated successfully');
      } else {
        await createTask(taskData).unwrap();
        toast.success('Task created successfully');
      }
      router.push('/developer/dashboard');
    } catch (error) {
      console.error('Task save error:', error);
      const message = createError?.data || error.message || 'Unknown error';
      toast.error(`Failed to save task: ${message}`);
    }
  };

  const handleChange = (e) => {
    console.log('Input change:', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const assignees = tasks ? [...new Set(tasks.map((t) => t.assignee).filter(Boolean))] : [];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm w-full">
      {isTasksLoading && <div className="text-center py-4">Loading assignees...</div>}
      <div className="space-y-6">
        <Input
          label="Task Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          icon={<FaTag />}
          error={errors.title}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            placeholder="Describe the task..."
            rows="4"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              {STATUSES.filter((s) => s !== 'Pending Approval' && s !== 'Closed').map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            icon={<FaCalendarAlt />}
            error={errors.startDate}
          />
          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            icon={<FaCalendarAlt />}
            error={errors.dueDate}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignee
            </label>
            <div className="relative">
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                required
              >
                <option value="">Select assignee</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
              <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {errors.assignee && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                  <FaExclamationCircle />
                  {errors.assignee}
                </p>
              )}
            </div>
          </div>
          <Input
            label="Tags (comma-separated)"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., bug, frontend, urgent"
            icon={<FaTag />}
            error={errors.tags}
          />
        </div>
        <Button
          type="submit"
          disabled={isCreating || isUpdating || isTasksLoading}
          className="w-full"
        >
          {isCreating || isUpdating ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}