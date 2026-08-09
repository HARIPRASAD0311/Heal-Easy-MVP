import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import MicButton from "../components/MicButton.jsx";

export default function Consultation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/doctor-dashboard", label: "Back to dashboard" }}
        profile={{ to: "/doctor-profile", label: "My profile" }}
      />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pulse-500/15 px-4 py-1.5 text-sm font-medium text-pulse-600">
          <span className="h-2 w-2 rounded-full bg-pulse-500" />
          Consultation in progress
        </span>

        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          Ananya Sharma
        </h1>
        <p className="mt-1 text-muted">Headache & mild fever · 2 days</p>

        <div className="surface-card mt-8 flex flex-col items-center">
          <MicButton label="Tap to record the consultation" />

          <div className="mt-8 w-full">
            <label className="field-label" htmlFor="transcript">
              Live transcript
            </label>
            <textarea
              id="transcript"
              rows={7}
              className="field-input resize-none"
              placeholder="The consultation transcript will appear here as the doctor and patient speak…"
              readOnly
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/case-sheet")}
          className="btn-primary mt-6 w-full py-3.5 text-base"
        >
          Generate Case Sheet
        </button>
      </main>
    </div>
  );
}
