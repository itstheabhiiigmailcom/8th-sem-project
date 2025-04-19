import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { forwardRef } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export default function LoginForm({ switchToSignup }) {
  const { login, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    await login(data);
    if (!error) {
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField label="Email" {...register('email')} error={errors.email} />
      <InputField
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={authLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        {authLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={switchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

// ✅ Fixed InputField with forwardRef
const InputField = forwardRef(
  ({ label, type = 'text', error, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          ref={ref} // Added ref here
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField'; // Required to avoid warning with forwardRef
