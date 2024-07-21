'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const AuthGuard = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter()


  useEffect(() => {
    if (!token) {
      router.push('/'); 
    }
  }, [router, token]);

  if (!token) {
    return null; 
  }

  return <>{children}</>;
};

export default AuthGuard;
