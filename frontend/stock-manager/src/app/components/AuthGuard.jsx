'use client'
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log(token, 'TOKEN')

   
  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    }
  }, []);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
