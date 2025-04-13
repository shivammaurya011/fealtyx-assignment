'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetTasksQuery } from '@/store/services/taskApi';
import TaskForm from '@/components/tasks/TaskForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditTask({ params }) {
  const { id } = params;
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const { data: tasks, isLoading } = useGetTasksQuery();

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      router.push('/login');
    }
  }, [user, router]);

  if (isLoading || !user) return <LoadingSpinner />;

  const task = tasks?.find((t) => t.id === parseInt(id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/developer/dashboard"
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-6">{task ? `Edit Task: ${task.title}` : 'Task Not Found'}</h1>
      {task ? <TaskForm task={task} /> : <p className="text-gray-500">Task not found.</p>}
    </div>
  );
}