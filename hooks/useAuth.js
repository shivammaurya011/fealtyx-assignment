import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(clearUser());
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return { user, logout };
};