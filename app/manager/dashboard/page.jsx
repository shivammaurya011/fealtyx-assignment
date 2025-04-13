'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ManagerTaskApproval from '@/components/tasks/ManagerTaskApproval';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Stats from '@/components/tasks/Stats';
import { FaBell, FaRocket } from 'react-icons/fa';

const Calendar = dynamic(() => import('@/components/common/Calendar'), { ssr: false });
const TrendChart = dynamic(() => import('@/components/charts/TrendChart'), { ssr: false });

export default function ManagerDashboard() {
  const user = useSelector((state) => state.auth.user);
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && (!user || user.role !== 'manager')) {
      router.push('/login');
    }
  }, [user, isAuthChecked, router]);

  if (!isAuthChecked) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <div className="mb-8 w-[50%]">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your team’s tasks and progress
          </p>
        </div>
        <div className="w-[50%]">
          <Stats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <ManagerTaskApproval />
          <TrendChart />
        </div>
        <div className="space-y-6">
          <Calendar />
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <FaBell className="text-[var(--primary)]" />
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Coming Soon</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Stay tuned for task notifications!
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Activity</h2>
              <FaRocket className="text-[var(--primary)]" />
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Coming Soon</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Stay tuned for task activity updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}