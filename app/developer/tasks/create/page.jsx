'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CreateTask() {
  const user = useSelector((state) => state.auth.user);
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && (!user || user.role !== 'developer')) {
      router.push('/login');
    }
  }, [user, isAuthChecked, router]);

  if (!isAuthChecked) return <LoadingSpinner />;

  if (!user) return null;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
      <TaskForm />
    </div>
  );
}