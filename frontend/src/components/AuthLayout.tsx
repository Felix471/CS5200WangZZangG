import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AuthLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

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

    return (
        <div className="flex flex-col min-h-screen w-full">
            <nav className="bg-blue-600 p-4 w-full">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-white font-bold text-xl">Admin Dashboard</div>
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-black hover:underline px-3 py-1 rounded"
                            style={{ border: 'none', backgroundColor: 'rgba(0,0,0,0.2)' }}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="mb-3">
                        <Link to="/appointment" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Appointments
                        </Link>
                        <Link to="/payment" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Payments
                        </Link>
                        <Link to="/dentists" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Dentists
                        </Link>
                        <Link to="/patients" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Patients
                        </Link>
                        <Link to="/clinic" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Clinics
                        </Link>
                        <Link to="/procedure-catalog" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Procedures
                        </Link>
                    </div>

                    <div>
                        <Link to="/treatment" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Treatments
                        </Link>
                        <Link to="/treatment-procedure" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Treatment Procedures
                        </Link>
                        <Link to="/dentist-procedure" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Dentist Procedures
                        </Link>
                        <Link to="/insurance" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Insurances
                        </Link>
                        <Link to="/medical-record" className="text-blue-200 inline-block px-3 py-1 mr-4 mb-2 hover:text-black hover:underline rounded">
                            Medical Records
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 flex-grow">
                <Outlet />
            </main>

            <footer className="bg-blue-600 p-3 text-white text-center w-full">
                © 2025 Dental Clinic Admin
            </footer>
        </div>
    );
};

export default AuthLayout;