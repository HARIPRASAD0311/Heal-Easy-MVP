import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StepIndicator from "../components/StepIndicator.jsx";
import MicButton from "../components/MicButton.jsx";

export default function SymptomVoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/select-hospital", label: "Back" }}
        profile={{ to: "/patient-dashboard", label: "My profile" }}
      />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <StepIndicator current="symptoms" />

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Tell us what's bothering you
        </h1>
        <p className="mt-2 text-center text-muted">
          Speak naturally in your own language. HealEasy will transcribe it below.
        </p>

        <div className="surface-card mt-8 flex flex-col items-center">
          <MicButton label="Tap to describe your symptoms" />

          <div className="mt-8 w-full">
            <label className="field-label" htmlFor="symptomText">
              Captured symptom text
            </label>
            <textarea
              id="symptomText"
              rows={5}
              className="field-input resize-none"
              placeholder="Your spoken symptoms will appear here as text…"
              readOnly
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/followup")}
          className="btn-primary mt-6 w-full py-3.5 text-base"
        >
          Continue
        </button>
      </main>
    </div>
  );
}
