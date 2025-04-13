'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FaBug, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar({ role }) {
  const { logout } = useAuth();

  const navItems = role === 'developer' ? [
    { name: 'Dashboard', path: '/developer/dashboard', icon: <FaChartLine /> },
    { name: 'Create Task', path: '/developer/tasks/create', icon: <FaBug /> },
  ] : [
    { name: 'Dashboard', path: '/manager/dashboard', icon: <FaChartLine /> },
  ];

  return (
    <div className="w-64 bg-blue-800 dark:bg-blue-900 text-white h-screen p-4 fixed md:static">
      <h2 className="text-2xl font-bold mb-6">Bug Tracker</h2>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center p-2 hover:bg-blue-700 dark:hover:bg-blue-800 rounded"
          >
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex items-center p-2 hover:bg-blue-700 dark:hover:bg-blue-800 rounded w-full text-left"
        >
          <FaSignOutAlt />
          <span className="ml-2">Logout</span>
        </button>
      </nav>
    </div>
  );
}