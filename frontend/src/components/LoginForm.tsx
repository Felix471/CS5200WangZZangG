import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Call the login API function
            const response = await login({ email, password });
            console.log('Login successful:', response);

            // Redirect based on user role
            if (response.user.role === 'patient') {
                navigate('/appointment');
            } else if (response.user.role === 'doctor') {
                navigate('/profile');
            } else {
                navigate('/profile');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Test account credentials:
                </p>
                <p className="text-xs text-gray-500">
                    Patient: john@example.com / password
                </p>
                <p className="text-xs text-gray-500">
                    Dentist: smith@example.com / password
                </p>
            </div>
        </form>
    );
};

export default LoginForm;