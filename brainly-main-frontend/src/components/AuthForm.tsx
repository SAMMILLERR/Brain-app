import { useState } from 'react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await apiService.signin(username, password);
        if (response.jwt) {
          // Parse JWT to get user info (basic decode)
          const payload = JSON.parse(atob(response.jwt.split('.')[1]));
          login(response.jwt, { id: payload.sub, username: payload.username });
        }
      } else {
        await apiService.signup(username, password);
        // After successful signup, automatically login
        const response = await apiService.signin(username, password);
        if (response.jwt) {
          const payload = JSON.parse(atob(response.jwt.split('.')[1]));
          login(response.jwt, { id: payload.sub, username: payload.username });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-800">Brain App</h1>
          <p className="text-secondary-600 mt-2">Your digital second brain</p>
        </div>

        <div className="flex bg-secondary-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin 
                ? 'bg-white text-secondary-800 shadow-sm' 
                : 'text-secondary-600 hover:text-secondary-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin 
                ? 'bg-white text-secondary-800 shadow-sm' 
                : 'text-secondary-600 hover:text-secondary-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-secondary-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            text={loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            disabled={loading}
            className="w-full"
          />
        </form>

        {!isLogin && (
          <div className="mt-4 text-xs text-secondary-600 bg-secondary-50 p-3 rounded-md">
            <strong>Password requirements:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>8-20 characters long</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (!@#$%^&*)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
