import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AuthLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setIsLoggedIn(false);
        }
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const topMenuItems = [
        { path: '/appointment', label: 'Appointments', bgColor: '#4A90E2' },
        { path: '/payment', label: 'Payments', bgColor: '#6ED141' },
        { path: '/dentists', label: 'Dentists', bgColor: '#8E44AD' },
        { path: '/patients', label: 'Patients', bgColor: '#F4CA16' },
        { path: '/clinic', label: 'Clinics', bgColor: '#FFA500' },
        { path: '/procedure-catalog', label: 'Procedures', bgColor: '#FF8CC6' },
    ];

    const bottomMenuItems = [
        { path: '/treatment', label: 'Treatments', bgColor: '#58D68D' },
        { path: '/treatment-procedure', label: 'Treatment Procedures', bgColor: '#5DAEF7' },
        { path: '/dentist-procedure', label: 'Dentist Procedures', bgColor: '#EDBB99' },
        { path: '/insurance', label: 'Insurances', bgColor: '#F1948A' },
        { path: '/medical-record', label: 'Medical Records', bgColor: '#EC7063' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-gray-900 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <nav className="bg-gray-900 p-4">
                <div className="container mx-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {topMenuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-3 rounded-md font-bold text-white ${currentPath === item.path ? 'ring-2 ring-white' : ''}`}
                                style={{ backgroundColor: item.bgColor }}
                            >
                                <div className="w-3 h-3 bg-white rounded-full mr-2 opacity-80"></div>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {bottomMenuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-3 rounded-md font-bold text-white ${currentPath === item.path ? 'ring-2 ring-white' : ''}`}
                                style={{ backgroundColor: item.bgColor }}
                            >
                                <div className="w-3 h-3 bg-white rounded-full mr-2 opacity-80"></div>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="flex-grow bg-gray-100 p-6">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-gray-900 p-4 text-center text-white">
                © 2025 Dental Clinic Admin
            </footer>
        </div>
    );
};

export default AuthLayout;