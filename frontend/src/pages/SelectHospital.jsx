import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StepIndicator from "../components/StepIndicator.jsx";
import Spinner from "../components/Spinner.jsx";
import Toast from "../components/Toast.jsx";
import { getHospitals } from "../services/api.js";
import { useSession } from "../context/SessionContext.jsx";

export default function SelectHospital() {
  const navigate = useNavigate();
  const { update } = useSession();

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selecting, setSelecting] = useState(null);

  useEffect(() => {
    getHospitals()
      .then((data) => setHospitals(Array.isArray(data) ? data : data.hospitals || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (h) => {
    // Backend uses hospitalId field
    const id = h.hospitalId || h._id || h.id;
    console.log("[SelectHospital] selected hospitalId:", id);
    setSelecting(id);
    update({ hospitalId: id });
    navigate("/symptoms");
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/login", label: "Back" }}
        profile={{ to: "/patient-dashboard", label: "My profile" }}
      />

      {error && <Toast message={error} onClose={() => setError(null)} />}

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <StepIndicator current="hospital" />

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Choose a hospital
        </h1>
        <p className="mt-2 text-center text-muted">
          Select where you'd like to check in for today's consultation.
        </p>

        {loading ? (
          <div className="mt-16 flex justify-center text-clinical-600">
            <Spinner size={36} />
          </div>
        ) : hospitals.length === 0 ? (
          <p className="mt-12 text-center text-muted">No hospitals available right now.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {hospitals.map((h) => {
              const id = h.hospitalId || h._id || h.id;
              return (
                <div key={id} className="surface-card flex flex-col hover:shadow-cardHover">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-clinical-100 text-clinical-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 21h18M6 21V7l6-4 6 4v14M10 21v-6h4v6"
                        stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold text-clinical-900">{h.name}</h3>
                  <p className="mt-1 text-sm text-muted">{h.location || h.address}</p>
                  {/* backend field is "wait", not "waitTime" */}
                  {(h.wait || h.waitTime) && (
                    <p className="mt-1 text-xs font-medium text-pulse-600">
                      {h.wait || h.waitTime}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSelect(h)}
                    disabled={selecting === id}
                    className="btn-primary mt-6 w-full flex items-center justify-center gap-2"
                  >
                    {selecting === id && <Spinner size={16} />}
                    Select
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
