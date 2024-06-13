'use client'
import { useState } from "react";
import {useForm} from "react-hook-form";

export default function RegisterForm({onSuccess }) {

  const [successMessage, setSuccessMessage] = useState('');
  const {register, formState:{errors}, handleSubmit, setError} = useForm();
  const [serverErrors, setServerErrors] = useState([]);
  
  const onSubmit = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
          const result = await response.json();
          if (result.errors) {
            result.errors.forEach(error => {
              setError(error.path, { type: 'server', message: error.msg });
            });
          }
          throw new Error('Failed to register user');
        }
  

        const result = await response.json();
        console.log('User registered:', result);

        // show success message
        setSuccessMessage('User registered successfully! Redirecting to login...');

        // Llamar a la función onSuccess pasada como prop
        setTimeout(() => {
          onSuccess();
      }, 2000); // 2 segundos de retraso

    } catch (error) {
      console.error('Error:', error);
      setServerErrors([...serverErrors, error.message]);
    }
  };

    return (
        <form className="p-8 flex flex-col" onSubmit={handleSubmit(onSubmit)}  noValidate >
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

      <div className="mb-4 username ">
        <label htmlFor="username" className=" text-sm font-medium text-gray-700">Username</label>
        <input type="text" autoComplete="username" {...register("username", { required: 'Username is required', minLength: { value: 6, message: 'Username must be at least 6 characters long' } })}  placeholder="enter your username" id="username" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
      </div>

      <div className="mb-4 email ">
        <label htmlFor="email" className=" text-sm font-medium text-gray-700">Email</label>
        <input type="email" autoComplete="email" {...register("email", { required: 'Email is required', pattern: { value: /^\S+@\S+$/i,  message: 'Enter a valid email address' } })}  placeholder="enter your email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="mb-4 password ">
        <label htmlFor="password" className=" text-sm font-medium text-gray-700">Password</label>
        <input type="password" autoComplete="new-password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })} placeholder="enter your password" id="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Sign Up</button>
      
      {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
        </form>
      );
};

