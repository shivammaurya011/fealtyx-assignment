'use client';
import { useSelector } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { FiLogOut, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user) {
    return (
      <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
              FealtyX Tracker
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
            FealtyX Tracker
          </Link>
          <div className='flex items-center gap-4'>
          <ThemeToggle />
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                ) : (
                  <FiUser className="w-5 h-5" />
                )}
              </div>
            </button>
            {isProfileOpen && (
              <div className="absolute -right-6 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border dark:border-slate-700">
                <div className="p-4 border-b dark:border-slate-700">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || user.username}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FiLogOut />
                  Log Out
                </button>
              </div>
            )}
          </div>

          </div>
          
        </div>
      </div>
    </header>
  );
}