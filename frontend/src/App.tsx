import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import LoginPage from './pages/LoginPage';
import AppointmentListPage from './pages/AppointmentListPage';
import AppointmentFormPage from "./pages/AppointmentFormPage";
import ClinicListPage from './pages/ClinicListPage';
import ClinicFormPage from './pages/ClinicFormPage';
import DentistListPage from "./pages/DentistListPage";
import DentistFormPage from "./pages/DentistFormPage";
import DentistProcedureListPage from "./pages/DentistProcedureListPage";
import DentistProcedureFormPage from "./pages/DentistProcedureFormPage";
import InsuranceListPage from './pages/InsuranceListPage';
import InsuranceFormPage from './pages/InsuranceFormPage';
import MedicalRecordListPage from './pages/MedicalRecordListPage';
import MedicalRecordFormPage from './pages/MedicalRecordFormPage';
import PatientListPage from './pages/PatientListPage';
import PatientFormPage from './pages/PatientFormPage';
import PaymentListPage from './pages/PaymentListPage';
import PaymentFormPage from "./pages/PaymentFormPage";
import ProcedureCatalogListPage from './pages/ProcedureCatalogListPage';
import ProcedureCatalogFormPage from "./pages/ProcedureCatalogFormPage";
import TreatmentListPage from './pages/TreatmentListPage';
import TreatmentFormPage from './pages/TreatmentFormPage';
import TreatmentProcedureListPage from './pages/TreatmentProcedureListPage';
import TreatmentProcedureFormPage from './pages/TreatmentProcedureFormPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route element={<AuthLayout />}>
                    <Route path="/appointment" element={<AppointmentListPage />} />
                    <Route path="/appointment/new" element={<AppointmentFormPage />} />
                    <Route path="/appointment/edit/:id" element={<AppointmentFormPage />} />
                    <Route path="/payment" element={<PaymentListPage />} />
                    <Route path="/payment/new" element={<PaymentFormPage />} />
                    <Route path="/payment/edit/:id" element={<PaymentFormPage />} />
                    <Route path="/dentists" element={<DentistListPage />} />
                    <Route path="/dentists/new" element={<DentistFormPage />} />
                    <Route path="/dentists/edit/:id" element={<DentistFormPage />} />
                    <Route path="/patients" element={<PatientListPage />} />
                    <Route path="/patients/new" element={<PatientFormPage />} />
                    <Route path="/patients/edit/:id" element={<PatientFormPage />} />
                    <Route path="/clinic" element={<ClinicListPage />} />
                    <Route path="/clinic/new" element={<ClinicFormPage />} />
                    <Route path="/clinic/edit/:id" element={<ClinicFormPage />} />
                    <Route path="/insurance" element={<InsuranceListPage />} />
                    <Route path="/insurance/new" element={<InsuranceFormPage />} />
                    <Route path="/insurance/edit/:id" element={<InsuranceFormPage />} />
                    <Route path="/treatment" element={<TreatmentListPage />} />
                    <Route path="/treatment/new" element={<TreatmentFormPage />} />
                    <Route path="/treatment/edit/:id" element={<TreatmentFormPage />} />
                    <Route path="/treatment-procedure" element={<TreatmentProcedureListPage />} />
                    <Route path="/treatment-procedure/new" element={<TreatmentProcedureFormPage />} />
                    <Route path="/treatment-procedure/edit/:id" element={<TreatmentProcedureFormPage />} />
                    <Route path="/medical-record" element={<MedicalRecordListPage />} />
                    <Route path="/medical-record/new" element={<MedicalRecordFormPage />} />
                    <Route path="/medical-record/edit/:id" element={<MedicalRecordFormPage />} />
                    <Route path="/dentist-procedure" element={<DentistProcedureListPage />} />
                    <Route path="/dentist-procedure/new" element={<DentistProcedureFormPage />} />
                    <Route path="/dentist-procedure/edit" element={<DentistProcedureFormPage />} />
                    <Route path="/procedure-catalog" element={<ProcedureCatalogListPage />} />
                    <Route path="/procedure-catalog/new" element={<ProcedureCatalogFormPage />} />
                    <Route path="/procedure-catalog/edit/:id" element={<ProcedureCatalogFormPage />} />
                </Route>
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
