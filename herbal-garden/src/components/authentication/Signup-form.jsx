import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { forwardRef } from 'react';

const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignupForm({ switchToLogin }) {
  const { signup, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    const result = await signup({
      fullName: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField label="Full Name" {...register('name')} error={errors.name} />
      <InputField label="Email" {...register('email')} error={errors.email} />
      <InputField
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={authLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        {authLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login
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
          ref={ref}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField'; // Required to avoid warning with forwardRef
