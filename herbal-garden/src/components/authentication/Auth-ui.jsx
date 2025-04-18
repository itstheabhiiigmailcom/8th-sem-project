import { useState } from 'react';
import LoginForm from './Login-form';
import SignupForm from './Signup-form';
import { useAuth } from '../../context/AuthContext';

export default function AuthUI() {
  const [activeTab, setActiveTab] = useState('login');
  const { error } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <p className="text-gray-500">
            {activeTab === 'login'
              ? 'Sign in to your account'
              : 'Create a new account'}
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 mb-4 text-center">{error}</div>
        )}

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('login')}
            className={`px-4 py-2 ${
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`px-4 py-2 ${
              activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          <LoginForm switchToSignup={() => setActiveTab('signup')} />
        ) : (
          <SignupForm switchToLogin={() => setActiveTab('login')} />
        )}
      </div>
    </div>
  );
}
