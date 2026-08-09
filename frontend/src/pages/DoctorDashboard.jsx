import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const PATIENTS = [
  { name: "Ananya Sharma", reason: "Headache & mild fever", status: "Waiting", waitedFor: "8 min" },
  { name: "Rahul Verma", reason: "Persistent cough", status: "Ready for review", waitedFor: "3 min" },
  { name: "Priya Natarajan", reason: "Abdominal pain", status: "Waiting", waitedFor: "15 min" },
];

const statusStyles = {
  Waiting: "bg-clinical-100 text-clinical-700",
  "Ready for review": "bg-pulse-500/15 text-pulse-600",
};

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/doctor-login", label: "Log out" }}
        profile={{ to: "/doctor-profile", label: "My profile" }}
      />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          Today's patients
        </h1>
        <p className="mt-2 text-muted">
          {PATIENTS.length} patients in queue, sorted by wait time.
        </p>

        <div className="mt-8 space-y-4">
          {PATIENTS.map((p) => (
            <div
              key={p.name}
              className="surface-card flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clinical-700 font-display font-bold text-white">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display font-bold text-clinical-900">{p.name}</h3>
                  <p className="text-sm text-muted">{p.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                  <p className="mt-1 text-xs text-muted">Waited {p.waitedFor}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/consultation")}
                  className="btn-primary whitespace-nowrap"
                >
                  Open Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
