import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Login</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome to the Medical Appointment System
                    </p>
                </div>

                <LoginForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;