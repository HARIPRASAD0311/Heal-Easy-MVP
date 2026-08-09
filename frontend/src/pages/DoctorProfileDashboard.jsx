import PageHeader from "../components/PageHeader.jsx";

const STATS = [
  { label: "Patients Today", value: "12" },
  { label: "Total Consultations", value: "1,248" },
  { label: "Pending Reports", value: "4" },
  { label: "Avg. Consultation Time", value: "9 min" },
];

const SCHEDULE = [
  { time: "9:30 AM", patient: "Ananya Sharma", reason: "Headache & mild fever" },
  { time: "10:15 AM", patient: "Rahul Verma", reason: "Persistent cough" },
  { time: "11:00 AM", patient: "Priya Natarajan", reason: "Abdominal pain" },
  { time: "11:45 AM", patient: "Karthik Iyer", reason: "Routine checkup" },
];

const RECENT_ACTIVITY = [
  { patient: "Ananya Sharma", action: "Case sheet generated", time: "10 min ago" },
  { patient: "Rahul Verma", action: "Summary received from patient", time: "24 min ago" },
  { patient: "Priya Natarajan", action: "Checked in and waiting", time: "38 min ago" },
];

export default function DoctorProfileDashboard() {
  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/doctor-login", label: "Log out" }} />

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          Doctor profile
        </h1>
        <p className="mt-2 text-muted">Your practice overview for today.</p>

        {/* Profile card */}
        <div className="surface-card mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
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
            <h2 className="font-display text-lg font-bold text-clinical-900">
              Dr. Meera Krishnan
            </h2>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
              <span>Specialization: <span className="font-medium text-ink">General Medicine</span></span>
              <span>Hospital: <span className="font-medium text-ink">Sunrise General Hospital</span></span>
              <span>Experience: <span className="font-medium text-ink">9 years</span></span>
              <span>Contact: <span className="font-medium text-ink">meera.krishnan@sunrise.health</span></span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:w-44">
            <button type="button" className="btn-primary w-full">
              Edit Profile
            </button>
            <button type="button" className="btn-secondary w-full">
              View Analytics
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="surface-card text-center sm:text-left">
              <p className="font-display text-2xl font-extrabold text-clinical-700">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Today's schedule */}
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-clinical-900">
            Today's schedule
          </h3>
          <div className="mt-4 space-y-3">
            {SCHEDULE.map((s, i) => (
              <div
                key={i}
                className="surface-card flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-display text-sm font-bold text-clinical-700">
                    {s.time}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-clinical-900">{s.patient}</p>
                    <p className="text-sm text-muted">{s.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent patient activity */}
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-clinical-900">
            Recent patient activity
          </h3>
          <div className="surface-card mt-4 divide-y divide-clinical-100">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium text-ink">{a.patient}</p>
                  <p className="text-sm text-muted">{a.action}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
