import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check authentication status when component mounts
    useEffect(() => {
        // In a real app, check auth token from localStorage or context
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);

        // Redirect to login if not authenticated
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-blue-600 p-4">
                <div className="container mx-auto flex justify-between">
                    <div className="text-white font-bold text-xl">Dental Clinic</div>
                    <div className="space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" className="text-white hover:text-blue-100">Profile</Link>
                                <Link to="/appointment" className="text-white hover:text-blue-100">Book Appointment</Link>
                                <Link to="/payment" className="text-white hover:text-blue-100">My Payments</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-blue-100 bg-transparent border-none cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-white hover:text-blue-100">Login</Link>
                                <Link to="/register" className="text-white hover:text-blue-100">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 flex-grow">
                <Outlet />
            </main>

            <footer className="bg-blue-600 p-4 text-white text-center">
                © 2025 Dental Clinic - All rights reserved
            </footer>
        </div>
    );
};

export default AuthLayout;