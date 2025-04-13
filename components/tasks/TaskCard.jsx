'use client';
import Link from 'next/link';
import { FaEdit, FaTrash, FaArrowUp } from 'react-icons/fa';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '@/store/services/taskApi';
import { formatTime } from '@/utils/formatDate';
import Timer from '@/components/tasks/Timer';
import StatusBadge from '@/components/tasks/StatusBadge';
import toast from 'react-hot-toast';

export default function TaskCard({ task, role }) {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleStatusChange = async (status) => {
    try {
      await updateTask({ id: task.id, status }).unwrap();
      toast.success(`Task status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id).unwrap();
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold truncate">{task.title}</h3>
            <StatusBadge status={task.status} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{task.description}</p>
        </div>
      </div>
      <div className="flex flex-col pb-2 gap-2">
        <div className='flex justify-between items-center'>
          <span className="text-xs text-gray-500 dark:text-gray-400">Priority</span>
          <p className="text-sm font-medium capitalize">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
              }`}
            />
            {task.priority}
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <span className="text-xs text-gray-500 dark:text-gray-400">Due Date</span>
          <p className="text-sm font-medium">
            {new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <span className="text-xs text-gray-500 dark:text-gray-400">Assignee</span>
          <p className="text-sm font-medium truncate">{task.assignee}</p>
        </div>
        <div className='flex justify-between items-center'>
          <span className="text-xs text-gray-500 dark:text-gray-400">Time Logged</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{formatTime(task.timeLogged)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t dark:border-slate-700">
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <Timer taskId={task.id} initialTime={task.timeLogged} />
      </div>
      {role === 'developer' && task.status !== 'Closed' && task.status !== 'Pending Approval' && (
          <div className="flex items-center justify-between pt-2 gap-2">
            <Link href={`/developer/tasks/${task.id}`}>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Edit task">
                <FaEdit />
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-red-500"
              disabled={isDeleting}
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => handleStatusChange('Pending Approval')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-green-500"
              disabled={isUpdating}
              aria-label="Submit for approval"
            >
              <FaArrowUp />
            </button>
          </div>
        )}
    </div>
  );
}