'use client';
import { useMemo, useState } from 'react';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/store/services/taskApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Button from '@/components/common/Button';
import { FaCheck, FaUserEdit, FaBan } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

export default function ManagerTaskApproval() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [selectedAssignee, setSelectedAssignee] = useState({});

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return [...tasks]
      .filter((task) => ['Pending Approval', 'Open', 'In Progress'].includes(task.status))
      .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }, [tasks]);

  const assignees = useMemo(() => {
    if (!tasks) return [];
    return [...new Set(tasks.map((task) => task.assignee).filter(Boolean))];
  }, [tasks]);

  const handleApprove = async (taskId) => {
    try {
      await updateTask({ id: taskId, status: 'Closed' }).unwrap();
      toast.success('Task approved and closed successfully');
    } catch (err) {
      toast.error('Failed to approve task');
      console.error('Approve error:', err);
    }
  };

  const handleReject = async (taskId) => {
    try {
      await updateTask({ id: taskId, status: 'Rejected' }).unwrap();
      toast.success('Task rejected successfully');
    } catch (err) {
      toast.error('Failed to reject task');
      console.error('Reject error:', err);
    }
  };

  const handleReassign = async (taskId) => {
    const newAssignee = selectedAssignee[taskId];
    if (!newAssignee) {
      toast.error('Please select an assignee');
      return;
    }
    try {
      await updateTask({ id: taskId, assignee: newAssignee }).unwrap();
      toast.success('Task reassigned successfully');
      setSelectedAssignee((prev) => ({ ...prev, [taskId]: '' }));
    } catch (err) {
      toast.error('Failed to reassign task');
      console.error('Reassign error:', err);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-8 text-center text-red-500 dark:text-red-400">
        Error loading tasks
      </div>
    );
  if (!filteredTasks.length) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No tasks to manage
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Task Approvals
        </h2>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {filteredTasks.length} pending tasks
        </span>
      </div>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="group border dark:border-slate-700 rounded-xl p-5 bg-gradient-to-r from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'Pending Approval'
                        ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {task.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {task.description || 'No description provided'}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {task.assignee || 'Unassigned'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 min-w-[260px]">
                <div className="flex items-center gap-2">
                  {task.status === 'Pending Approval' && (
                    <Button
                      onClick={() => handleReject(task.id)}
                      disabled={isUpdating}
                      className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all"
                      data-tooltip-id={`reject-${task.id}`}
                      data-tooltip-content="Reject Task"
                    >
                      <FaBan className="w-4 h-4" />
                    </Button>
                  )}
                  {task.status === 'Pending Approval' && (
                    <Tooltip
                      id={`reject-${task.id}`}
                      place="top"
                      className="bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-1 shadow-lg"
                    />
                  )}
                  {['Open', 'In Progress'].includes(task.status) && (
                    <Button
                      onClick={() => handleApprove(task.id)}
                      disabled={isUpdating}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all"
                      data-tooltip-id={`approve-${task.id}`}
                      data-tooltip-content="Approve and Close Task"
                    >
                      <FaCheck className="w-4 h-4" />
                    </Button>
                  )}
                  {['Open', 'In Progress'].includes(task.status) && (
                    <Tooltip
                      id={`approve-${task.id}`}
                      place="top"
                      className="bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-1 shadow-lg"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 w-full">
                  <select
                    value={selectedAssignee[task.id] || ''}
                    onChange={(e) =>
                      setSelectedAssignee((prev) => ({
                        ...prev,
                        [task.id]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)] transition-all"
                    data-tooltip-id={`reassign-select-${task.id}`}
                    data-tooltip-content="Select a new assignee"
                  >
                    <option value="">Reassign Task...</option>
                    {assignees.map((assignee) => (
                      <option key={assignee} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                  <Tooltip
                    id={`reassign-select-${task.id}`}
                    place="top"
                    className="bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-1 shadow-lg"
                  />
                  <Button
                    onClick={() => handleReassign(task.id)}
                    disabled={isUpdating || !selectedAssignee[task.id]}
                    className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all"
                    data-tooltip-id={`reassign-${task.id}`}
                    data-tooltip-content="Reassign Task"
                  >
                    <FaUserEdit className="w-4 h-4" />
                  </Button>
                  <Tooltip
                    id={`reassign-${task.id}`}
                    place="top"
                    className="bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-1 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}