'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import './globals.css';
import Header from '@/components/common/Header';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { initializeFromLocalStorage } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';

function InnerLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      {pathname !== '/login' && <Header />}
      <main className={pathname === '/login' ? 'pt-0' : 'pt-16'}>{children}</main>
      <Toaster position="top-right" />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)]">
        <Provider store={store}>
          <InnerLayout>{children}</InnerLayout>
        </Provider>
      </body>
    </html>
  );
}
