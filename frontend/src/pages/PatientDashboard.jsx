import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const RECENT_CONSULTATIONS = [
  { date: "2 Aug 2026", hospital: "Sunrise General Hospital", reason: "Seasonal cold", status: "Completed" },
  { date: "18 Jun 2026", hospital: "Lotus Multispecialty Clinic", reason: "Routine checkup", status: "Completed" },
  { date: "3 Apr 2026", hospital: "Government OPD Center", reason: "Minor sprain", status: "Completed" },
];

const QUICK_ACTIONS = [
  {
    label: "Book Consultation",
    to: "/select-hospital",
    icon: (
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  {
    label: "View Reports",
    to: "/patient-dashboard",
    icon: (
      <path
        d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5M9 13h6M9 17h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Previous Visits",
    to: "/patient-dashboard",
    icon: (
      <path
        d="M12 8v5l3 3M21 12a9 9 0 11-9-9 9 9 0 019 9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Log out" }} />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost -ml-3 mb-2 inline-flex items-center gap-1.5 text-sm"
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

        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          Welcome back, Ananya
        </h1>
        <p className="mt-2 text-muted">Here's your health overview for today.</p>

        {/* Profile card */}
        <div className="surface-card mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-clinical-100 text-clinical-500">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-clinical-900">Ananya Sharma</h2>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
              <span>Age: <span className="font-medium text-ink">27</span></span>
              <span>Blood Group: <span className="font-medium text-ink">O+</span></span>
              <span>Phone: <span className="font-medium text-ink">+91 90000 00000</span></span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => navigate(a.to)}
              className="surface-card flex items-center gap-3 text-left hover:shadow-cardHover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clinical-100 text-clinical-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {a.icon}
                </svg>
              </span>
              <span className="font-display text-sm font-bold text-clinical-900">
                {a.label}
              </span>
            </button>
          ))}
        </div>

        {/* Recent consultations */}
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-clinical-900">
            Recent consultations
          </h3>
          <div className="mt-4 space-y-3">
            {RECENT_CONSULTATIONS.map((c, i) => (
              <div
                key={i}
                className="surface-card flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-display font-semibold text-clinical-900">{c.hospital}</p>
                  <p className="text-sm text-muted">{c.reason}</p>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                  <span className="text-xs text-muted">{c.date}</span>
                  <span className="rounded-full bg-pulse-500/15 px-3 py-1 text-xs font-semibold text-pulse-600">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/select-hospital")}
          className="btn-primary mt-8 w-full py-3.5 text-base"
        >
          Start New Consultation
        </button>
      </main>
    </div>
  );
}
