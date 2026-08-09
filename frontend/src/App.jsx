import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import PatientProfileDashboard from "./pages/PatientProfileDashboard.jsx";
import SelectHospital from "./pages/SelectHospital.jsx";
import SymptomVoice from "./pages/SymptomVoice.jsx";
import FollowupQuestions from "./pages/FollowupQuestions.jsx";
import PatientSummary from "./pages/PatientSummary.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import DoctorProfileDashboard from "./pages/DoctorProfileDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import Consultation from "./pages/Consultation.jsx";
import CaseSheet from "./pages/CaseSheet.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-profile" element={<PatientProfileDashboard />} />
        <Route path="/select-hospital" element={<SelectHospital />} />
        <Route path="/symptoms" element={<SymptomVoice />} />
        <Route path="/followup" element={<FollowupQuestions />} />
        <Route path="/summary" element={<PatientSummary />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/doctor-profile-dashboard" element={<DoctorProfileDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/case-sheet" element={<CaseSheet />} />
      </Routes>
    </BrowserRouter>
  );
}
