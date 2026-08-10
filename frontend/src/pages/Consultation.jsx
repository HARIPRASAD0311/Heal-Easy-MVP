import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Spinner from "../components/Spinner.jsx";
import Toast from "../components/Toast.jsx";
import { generateCaseSheet } from "../services/api.js";
import { useSpeechToText } from "../hooks/useSpeechToText.js";
import { useSession } from "../context/SessionContext.jsx";

export default function Consultation() {
  const navigate = useNavigate();
  const { session, update } = useSession();

  const [transcript, setTranscript] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleSpeechUpdate = useCallback((text) => setTranscript(text), []);

  const { listening, supported, error: micError, clearError, start, stop } =
    useSpeechToText(handleSpeechUpdate);

  const toggleMic = () => {
    if (!supported) { setError("Speech recognition not supported in this browser."); return; }
    listening ? stop() : start(transcript);
  };

  const handleGenerate = async () => {
    if (listening) stop();
    if (!transcript.trim()) {
      setError("Please record or type the consultation transcript first.");
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      // consultationId is optional — backend only requires transcript
      const payload = {
        transcript: transcript.trim(),
        ...(session.consultationId && { consultationId: session.consultationId }),
        ...(session.summary && { doctorSummary: session.summary }),
      };
      console.log("[Consultation] POST /api/ai/casesheet", payload);

      const resp = await generateCaseSheet(payload);
      console.log("[Consultation] caseSheet response:", resp);

      update({ caseSheet: resp.caseSheet || resp });
      navigate("/case-sheet");
    } catch (err) {
      console.error("[Consultation] error:", err);
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const activeError = error || micError;

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/doctor-dashboard", label: "Back to dashboard" }}
        profile={{ to: "/doctor-profile", label: "My profile" }}
      />

      {activeError && (
        <Toast message={activeError} onClose={() => { setError(null); clearError(); }} />
      )}

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pulse-500/15 px-4 py-1.5 text-sm font-medium text-pulse-600">
          <span className="h-2 w-2 rounded-full bg-pulse-500" />
          Consultation in progress
        </span>

        <h1 className="font-display text-3xl font-extrabold text-clinical-900">
          Record Consultation
        </h1>
        <p className="mt-1 text-muted">
          Tap the mic to record live, or type the transcript directly.
        </p>

        <div className="surface-card mt-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={toggleMic}
              aria-pressed={listening}
              aria-label={listening ? "Stop recording" : "Start recording"}
              className={[
                "relative flex h-24 w-24 items-center justify-center rounded-full transition sm:h-28 sm:w-28",
                listening
                  ? "bg-pulse-500 shadow-[0_0_0_10px_rgba(15,191,184,0.15)]"
                  : "bg-clinical-700 shadow-card hover:bg-clinical-800",
              ].join(" ")}
            >
              {listening && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-30" />
              )}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative text-white">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
                <path d="M5 11a7 7 0 0014 0M12 18v3"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-sm font-medium text-muted">
              {listening ? "Recording… tap to stop" : "Tap to record the consultation"}
            </p>
          </div>

          <div className="mt-8 w-full">
            <label className="field-label" htmlFor="transcript">Live transcript</label>
            <textarea
              id="transcript"
              rows={7}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="field-input resize-none"
              placeholder="The consultation transcript will appear here — you can also type or paste…"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="btn-primary mt-6 w-full py-3.5 text-base flex items-center justify-center gap-2"
        >
          {generating && <Spinner size={18} />}
          {generating ? "Generating case sheet…" : "Generate Case Sheet"}
        </button>
      </main>
    </div>
  );
}
