import { FaFolderOpen, FaSyncAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useGetTasksQuery } from '@/store/services/taskApi';

export default function Stats() {
  const { data: tasks } = useGetTasksQuery();

  const stats = [
    {
      title: 'Open',
      value: tasks?.filter((t) => t.status === 'Open').length || 0,
      icon: <FaFolderOpen />,
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900/50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'In Progress',
      value: tasks?.filter((t) => t.status === 'In Progress').length || 0,
      icon: <FaSyncAlt />,
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900/50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Pending Approval',
      value: tasks?.filter((t) => t.status === 'Pending Approval').length || 0,
      icon: <FaClock />,
      bgLight: 'bg-amber-50',
      bgDark: 'bg-amber-900/50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Closed',
      value: tasks?.filter((t) => t.status === 'Closed').length || 0,
      icon: <FaCheckCircle />,
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900/50',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.bgLight} dark:${stat.bgDark}`}>
              <span className={`text-xl ${stat.iconColor}`}>{stat.icon}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}