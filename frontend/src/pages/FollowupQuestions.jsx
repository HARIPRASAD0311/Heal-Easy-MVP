import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StepIndicator from "../components/StepIndicator.jsx";
import Spinner from "../components/Spinner.jsx";
import Toast from "../components/Toast.jsx";
import { createConsultation, getFollowup, generateSummary } from "../services/api.js";
import { useSession } from "../context/SessionContext.jsx";

export default function FollowupQuestions() {
  const navigate = useNavigate();
  const { session, update } = useSession();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // ── Step 1: create consultation if not already done ──────────────────
        let consultationId = session.consultationId;

        if (!consultationId) {
          const payload = {
            patientId: session.patientId,
            hospitalId: session.hospitalId,
            symptoms: session.symptoms,
          };
          console.log("[FollowupQuestions] Creating consultation with:", payload);

          const c = await createConsultation(payload);

          // Backend returns { consultationId, patientId, ... }
          consultationId = c.consultationId;
          console.log("[FollowupQuestions] Consultation created. consultationId:", consultationId);

          update({ consultationId });
        } else {
          console.log("[FollowupQuestions] Using existing consultationId:", consultationId);
        }

        if (!consultationId) {
          throw new Error("Failed to get a valid consultation ID from the server.");
        }

        // ── Step 2: fetch AI follow-up questions ──────────────────────────────
        const followupPayload = {
          consultationId,
          symptoms: session.symptoms,
        };
        console.log("[FollowupQuestions] Calling /api/ai/followup with:", followupPayload);

        const resp = await getFollowup(followupPayload);
        const qs = resp.questions || resp.followupQuestions || [];
        console.log("[FollowupQuestions] Received questions:", qs);

        setQuestions(qs);
        setAnswers(qs.map(() => ""));
        update({ followUpQuestions: qs });

      } catch (err) {
        console.error("[FollowupQuestions] Init error:", err);
        setError(err.message);
      } finally {
        setLoadingQ(false);
      }
    };

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setAnswer = (i, val) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const consultationId = session.consultationId;

      if (!consultationId) {
        throw new Error("No consultation ID found. Please restart the flow from registration.");
      }

      const summaryPayload = {
        consultationId,
        followUpQuestions: session.followUpQuestions || questions,
        followUpAnswers: answers,
      };
      console.log("[FollowupQuestions] Calling /api/ai/summary with:", summaryPayload);

      const resp = await generateSummary(summaryPayload);
      console.log("[FollowupQuestions] Summary response:", resp);

      update({ summary: resp.summary || resp });
      navigate("/summary");
    } catch (err) {
      console.error("[FollowupQuestions] Summary error:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/symptoms", label: "Back" }}
        profile={{ to: "/patient-dashboard", label: "My profile" }}
      />

      {error && <Toast message={error} onClose={() => setError(null)} />}

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <StepIndicator current="followup" />

        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          A few quick follow-ups
        </h1>
        <p className="mt-2 text-center text-muted">
          These help fill in the details your doctor would usually ask for.
        </p>

        {loadingQ ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-clinical-600">
            <Spinner size={36} />
            <p className="text-sm text-muted">Generating questions…</p>
          </div>
        ) : error ? (
          // Show error state with retry option
          <div className="surface-card mt-8 text-center space-y-4">
            <p className="text-muted">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-secondary">
              Retry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="surface-card mt-8 space-y-6">
            {questions.length === 0 ? (
              <p className="text-center text-muted">No questions returned. You can proceed.</p>
            ) : (
              questions.map((q, i) => (
                <div key={i}>
                  <label className="field-label" htmlFor={`q-${i}`}>
                    {i + 1}.{" "}
                    {typeof q === "string" ? q : q.question || q.text || JSON.stringify(q)}
                  </label>
                  <input
                    id={`q-${i}`}
                    type="text"
                    value={answers[i]}
                    onChange={(e) => setAnswer(i, e.target.value)}
                    placeholder="Type your answer…"
                    className="field-input"
                  />
                </div>
              ))
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2"
            >
              {submitting && <Spinner size={18} />}
              {submitting ? "Generating summary…" : "Generate Summary"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
