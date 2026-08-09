import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/doctor-login", label: "Log out" }} />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost -ml-3 mb-4 inline-flex items-center gap-1.5 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <div className="surface-card flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-clinical-100 text-clinical-500">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="mt-4 font-display text-2xl font-extrabold text-clinical-900">
            Dr. Meera Krishnan
          </h1>
          <p className="mt-1 text-muted">General Medicine</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted">
            <span>
              Hospital: <span className="font-medium text-ink">Sunrise General Hospital</span>
            </span>
            <span>
              Experience: <span className="font-medium text-ink">9 years</span>
            </span>
          </div>

          {/* Today's patient count */}
          <div className="mt-6 flex items-center gap-2 rounded-full bg-clinical-100 px-4 py-1.5 text-sm font-semibold text-clinical-700">
            <span className="h-2 w-2 rounded-full bg-clinical-600" />
            12 patients today
          </div>

          {/* Availability toggle — UI only */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-clinical-100 bg-clinical-50 px-4 py-3">
            <span className="text-sm font-medium text-ink">
              {available ? "Available for consultations" : "Currently unavailable"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={available}
              onClick={() => setAvailable((v) => !v)}
              className={[
                "relative h-6 w-11 shrink-0 rounded-full transition",
                available ? "bg-pulse-500" : "bg-clinical-200",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
                  available ? "left-5" : "left-0.5",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/doctor-dashboard")}
            className="btn-primary w-full"
          >
            Open Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/doctor-profile")}
            className="btn-secondary w-full"
          >
            View Reports
          </button>
          <button
            type="button"
            onClick={() => navigate("/doctor-profile")}
            className="btn-secondary w-full"
          >
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
}
