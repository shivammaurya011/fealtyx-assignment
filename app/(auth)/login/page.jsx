'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/services/authApi';
import { setUser } from '@/store/slices/authSlice';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      if (!username || !password) {
        setError('Please fill in all fields');
        return;
      }
      try {
        const { user, token } = await login({ username, password }).unwrap();
        dispatch(setUser({ user, token }));
        toast.success('Logged in successfully!');
        router.push(user.role === 'developer' ? '/developer/dashboard' : '/manager/dashboard');
      } catch (err) {
        setError('Invalid username or password');
        toast.error('Login failed. Please try again.');
      }
    },
    [username, password, login, dispatch, router]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to FealtyX</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            icon={<FaUser />}
            required
            error={error && !username ? 'Username is required' : ''}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            icon={<FaLock />}
            required
            error={error && !password ? 'Password is required' : ''}
          />

          {error && (
            <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 rounded-lg">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <LoadingSpinner /> : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}