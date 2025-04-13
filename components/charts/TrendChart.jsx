'use client';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetTasksQuery } from '@/store/services/taskApi';
import { calculateTrendData } from '@/utils/calculateTrend';
import LoadingSpinner from '@/components/common/LoadingSpinner';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TrendChart({ assignee }) {
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return assignee
      ? tasks.filter((task) => task.assignee === assignee && task.startDate && task.dueDate)
      : tasks.filter((task) => task.startDate && task.dueDate);
  }, [tasks, assignee]);

  const trendData = useMemo(() => calculateTrendData(filteredTasks), [filteredTasks]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="p-6 text-center text-red-500">Error loading chart</div>;
  if (!trendData.labels.length) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">No task trends available</div>;
  }

  const isDarkMode = document.documentElement.classList.contains('dark');
  const chartData = {
    labels: trendData.labels,
    datasets: [
      {
        label: 'Active Tasks',
        data: trendData.counts,
        borderColor: isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)',
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Overdue Tasks',
        data: trendData.overdueCounts,
        borderColor: isDarkMode ? 'rgba(248, 113, 113, 1)' : 'rgba(220, 38, 38, 1)',
        backgroundColor: isDarkMode ? 'rgba(248, 113, 113, 0.2)' : 'rgba(220, 38, 38, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#1f2937',
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1f2937' : '#fff',
        titleColor: isDarkMode ? '#e5e7eb' : '#1f2937',
        bodyColor: isDarkMode ? '#e5e7eb' : '#1f2937',
      },
    },
    scales: {
      x: {
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: isDarkMode ? '#e5e7eb' : '#4b5563' },
      },
      y: {
        beginAtZero: true,
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: isDarkMode ? '#e5e7eb' : '#4b5563', stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Task Trends</h2>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}