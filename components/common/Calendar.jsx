'use client';
import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useGetTasksQuery } from '@/store/services/taskApi';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: tasks } = useGetTasksQuery();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const taskDates = useMemo(() => {
    if (!tasks) return new Set();
    return new Set(
      tasks
        .filter((task) => task.dueDate)
        .map((task) => new Date(task.dueDate).toISOString().split('T')[0])
    );
  }, [tasks]);

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
          ←
        </button>
        <h3 className="font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isToday = isSameDay(date, new Date());
          const hasTask = taskDates.has(date.toISOString().split('T')[0]);
          return (
            <div
              key={date.toISOString()}
              className={`p-2 text-sm rounded-lg ${isCurrentMonth ? '' : 'text-gray-400'} ${
                isToday ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
              } ${hasTask ? 'relative before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:rounded-full before:bg-red-500' : ''} hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors`}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}