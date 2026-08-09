import PageHeader from "../components/PageHeader.jsx";

const STATS = [
  { label: "Total Visits", value: "14" },
  { label: "Active Prescriptions", value: "3" },
  { label: "Reports", value: "7" },
  { label: "Upcoming Appointments", value: "1" },
];

const HISTORY = [
  { date: "2 Aug 2026", doctor: "Dr. Meera Krishnan", reason: "Seasonal cold", status: "Completed" },
  { date: "18 Jun 2026", doctor: "Dr. Arjun Menon", reason: "Routine checkup", status: "Completed" },
  { date: "3 Apr 2026", doctor: "Dr. Meera Krishnan", reason: "Minor sprain", status: "Completed" },
  { date: "22 Feb 2026", doctor: "Dr. Farah Sheikh", reason: "Skin allergy", status: "Completed" },
];

export default function PatientProfileDashboard() {
  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Log out" }} />

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          My profile
        </h1>
        <p className="mt-2 text-muted">Your health details and consultation history.</p>

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
            <h2 className="font-display text-lg font-bold text-clinical-900">Ananya Sharma</h2>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
              <span>Age: <span className="font-medium text-ink">27</span></span>
              <span>Gender: <span className="font-medium text-ink">Female</span></span>
              <span>Phone: <span className="font-medium text-ink">+91 90000 00000</span></span>
              <span>Email: <span className="font-medium text-ink">ananya.sharma@example.com</span></span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:w-44">
            <button type="button" className="btn-primary w-full">
              View Reports
            </button>
            <button type="button" className="btn-secondary w-full">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick stats */}
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

        {/* Recent consultation history */}
        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-clinical-900">
            Recent consultation history
          </h3>

          <div className="surface-card mt-4 overflow-x-auto p-0 sm:p-0">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-clinical-100 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-5 py-4 sm:px-6">Date</th>
                  <th className="px-5 py-4 sm:px-6">Doctor</th>
                  <th className="px-5 py-4 sm:px-6">Reason</th>
                  <th className="px-5 py-4 text-right sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinical-100">
                {HISTORY.map((h, i) => (
                  <tr key={i} className="transition hover:bg-clinical-50">
                    <td className="whitespace-nowrap px-5 py-4 text-muted sm:px-6">{h.date}</td>
                    <td className="px-5 py-4 font-medium text-ink sm:px-6">{h.doctor}</td>
                    <td className="px-5 py-4 text-muted sm:px-6">{h.reason}</td>
                    <td className="px-5 py-4 text-right sm:px-6">
                      <span className="inline-block rounded-full bg-pulse-500/15 px-3 py-1 text-xs font-semibold text-pulse-600">
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
