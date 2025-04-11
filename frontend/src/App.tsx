import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentPage from './pages/AppointmentPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './components/AuthLayout';
import AppointmentFormPage from "./pages/AppointmentFormPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public pages without navigation layout */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected pages with authentication layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/appointment" element={<AppointmentPage />} />
                    <Route path="/appointment/new" element={<AppointmentFormPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                </Route>

                {/* 404 page */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;