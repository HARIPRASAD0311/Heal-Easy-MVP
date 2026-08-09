import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StepIndicator from "../components/StepIndicator.jsx";

const HOSPITALS = [
  {
    name: "Sunrise General Hospital",
    location: "MG Road, Puducherry",
    wait: "12 min avg. wait",
  },
  {
    name: "Lotus Multispecialty Clinic",
    location: "Anna Nagar, Puducherry",
    wait: "20 min avg. wait",
  },
  {
    name: "Government OPD Center",
    location: "Lawspet, Puducherry",
    wait: "35 min avg. wait",
  },
];

export default function SelectHospital() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/login", label: "Back" }}
        profile={{ to: "/patient-dashboard", label: "My profile" }}
      />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <StepIndicator current="hospital" />

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Choose a hospital
        </h1>
        <p className="mt-2 text-center text-muted">
          Select where you'd like to check in for today's consultation.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {HOSPITALS.map((h) => (
            <div key={h.name} className="surface-card flex flex-col hover:shadow-cardHover">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-clinical-100 text-clinical-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 21h18M6 21V7l6-4 6 4v14M10 21v-6h4v6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-clinical-900">
                {h.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{h.location}</p>
              <p className="mt-1 text-xs font-medium text-pulse-600">{h.wait}</p>

              <button
                type="button"
                onClick={() => navigate("/symptoms")}
                className="btn-primary mt-6 w-full"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
