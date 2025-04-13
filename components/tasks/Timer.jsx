'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useUpdateTaskMutation, useGetTasksQuery } from '@/store/services/taskApi';
import { formatTime } from '@/utils/formatDate';
import { FaPlay, FaPause } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Timer({ taskId, initialTime = 0 }) {
  const [time, setTime] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`timer_${taskId}`);
      return stored ? parseInt(stored, 10) : initialTime;
    }
    return initialTime;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: tasks } = useGetTasksQuery();
  const intervalRef = useRef(null);
  const prevIsRunningRef = useRef(isRunning);

  const task = tasks?.find((t) => t.id === taskId.toString());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`timer_${taskId}`);
      if (stored === null) {
        localStorage.setItem(`timer_${taskId}`, initialTime);
      }
    }
  }, [taskId, initialTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const updated = prev + 1;
          localStorage.setItem(`timer_${taskId}`, updated);
          return updated;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, taskId]);

  const saveTime = useCallback(async () => {
    try {
      await updateTask({ id: taskId, timeLogged: time }).unwrap();
      toast.success('Time logged successfully');
    } catch (error) {
      toast.error('Failed to log time');
    }
  }, [taskId, time, updateTask]);

  const updateStatusToInProgress = useCallback(async () => {
    if (task?.status !== 'In Progress') {
      try {
        await updateTask({ id: taskId, status: 'In Progress' }).unwrap();
        toast.success('Task status updated to In Progress');
      } catch (error) {
        toast.error('Failed to update task status');
      }
    }
  }, [taskId, task?.status, updateTask]);

  useEffect(() => {
    if (!prevIsRunningRef.current && isRunning) {
      updateStatusToInProgress();
    } else if (prevIsRunningRef.current && !isRunning && time !== initialTime) {
      saveTime();
    }
    prevIsRunningRef.current = isRunning;
  }, [isRunning, saveTime, time, initialTime, updateStatusToInProgress]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isRunning) {
        localStorage.setItem(`timer_${taskId}`, time);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isRunning, taskId, time]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between w-full gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {formatTime(time)}
      </span>
      <button
        onClick={handleToggle}
        disabled={isUpdating}
        className={`p-1 h-6 w-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
          isUpdating
            ? 'bg-gray-400 cursor-not-allowed'
            : isRunning
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? (
          <FaPause className="text-white h-3 w-3" />
        ) : (
          <FaPlay className="text-white h-3 w-3" />
        )}
      </button>
    </div>
  );
}