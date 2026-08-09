import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function DoctorLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/doctor-dashboard");
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Back to home" }} />

      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-16 sm:px-8">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-clinical-100 bg-white px-4 py-1.5 text-sm font-medium text-clinical-700 shadow-sm">
          Doctor Portal
        </span>

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Doctor login
        </h1>
        <p className="mt-2 text-center text-muted">
          Access patient summaries and manage today's consultations.
        </p>

        <form onSubmit={handleSubmit} className="surface-card mt-8 w-full space-y-5">
          <div>
            <label className="field-label" htmlFor="docEmail">Email</label>
            <input id="docEmail" type="email" placeholder="doctor@hospital.com" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="docPassword">Password</label>
            <input id="docPassword" type="password" placeholder="Enter your password" className="field-input" required />
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 text-base">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
