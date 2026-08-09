import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StepIndicator from "../components/StepIndicator.jsx";

const QUESTIONS = [
  "How long have you been experiencing these symptoms?",
  "On a scale of 1 to 10, how would you rate the discomfort?",
  "Have you taken any medication for this already?",
];

export default function FollowupQuestions() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/summary");
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/symptoms", label: "Back" }}
        profile={{ to: "/patient-dashboard", label: "My profile" }}
      />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <StepIndicator current="followup" />

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          A few quick follow-ups
        </h1>
        <p className="mt-2 text-center text-muted">
          These help fill in the details your doctor would usually ask for.
        </p>

        <form onSubmit={handleSubmit} className="surface-card mt-8 space-y-6">
          {QUESTIONS.map((q, i) => (
            <div key={i}>
              <label className="field-label" htmlFor={`q-${i}`}>
                {i + 1}. {q}
              </label>
              <input
                id={`q-${i}`}
                type="text"
                placeholder="Type your answer…"
                className="field-input"
              />
            </div>
          ))}

          <button type="submit" className="btn-primary w-full py-3.5 text-base">
            Generate Summary
          </button>
        </form>
      </main>
    </div>
  );
}
