'use client';
import { useState, useMemo } from 'react';
import { useGetTasksQuery } from '@/store/services/taskApi';
import TaskCard from './TaskCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { PRIORITIES, STATUSES } from '@/lib/constants';
import Link from 'next/link';
import { FaPlus, FaFilter } from 'react-icons/fa';

export default function TaskList({ role, assignee, status }) {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [filters, setFilters] = useState({
    priority: '',
    status: status || '',
    sortBy: 'dueDate',
  });

  const filteredTasks = useMemo(() => {
    let result = tasks ? [...tasks] : [];

    if (assignee) {
      result = result.filter((task) => task.assignee === assignee);
    }
    if (filters.status && !status) {
      result = result.filter((task) => task.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    return [...result].sort((a, b) => {
      if (a.status === 'Closed' && b.status !== 'Closed') return 1;
      if (b.status === 'Closed' && a.status !== 'Closed') return -1;

      if (filters.sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return a.title.localeCompare(b.title);
    });
  }, [tasks, assignee, filters, status]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaFilter className="text-[var(--primary)]" />
            Tasks
          </h2>
          <div className="flex gap-2">
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="px-3 py-2 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {!status && (
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        {role === 'developer' && (
          <Link
            href="/developer/tasks/create"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)]"
          >
            <FaPlus />
            New Task
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} role={role} />
          ))
        ) : (
          <p className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
}