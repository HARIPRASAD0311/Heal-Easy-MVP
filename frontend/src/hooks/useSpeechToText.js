import { useState, useRef, useEffect } from "react";

/**
 * Reusable Web Speech API hook.
 *
 * @param {(text: string) => void} onUpdate  - called on every interim + final result
 * @returns {{ listening, supported, error, start, stop, clearError }}
 */
export function useSpeechToText(onUpdate) {
  const [listening, setListening] = useState(false);
  const [supported] = useState(
    !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const [error, setError] = useState(null);

  const recRef = useRef(null);
  const finalRef = useRef(""); // accumulates confirmed words across sessions

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onstart = () => {
      setListening(true);
      setError(null);
    };

    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalRef.current = (finalRef.current + " " + chunk).trimStart();
        } else {
          interim = chunk;
        }
      }
      // Pass the combined final + live interim text to the consumer
      onUpdate(finalRef.current + (interim ? " " + interim : ""));
    };

    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "permission-denied") {
        setError("Microphone access denied. Click the 🔒 in the address bar, allow microphone, then refresh.");
      } else if (e.error === "no-speech") {
        setError("No speech detected. Speak clearly and try again.");
      } else if (e.error === "aborted") {
        // user-triggered stop — not a real error
      } else {
        setError(`Microphone error: ${e.error}`);
      }
    };

    rec.onend = () => {
      setListening(false);
      // Strip any leftover interim — final ref already has the confirmed text
      onUpdate(finalRef.current);
    };

    recRef.current = rec;

    return () => {
      try { rec.abort(); } catch (_) {}
    };
  // onUpdate is intentionally excluded — we don't want to recreate recognition
  // on every render. The ref captures the latest version through closure.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const start = (existingText = "") => {
    if (!recRef.current) return;
    // Seed final ref with any text already in the field so appending works
    finalRef.current = existingText.trimEnd();
    try {
      recRef.current.start();
    } catch (_) {
      // Ignore "already started" error
    }
  };

  const stop = () => {
    if (!recRef.current) return;
    try { recRef.current.stop(); } catch (_) {}
  };

  return {
    listening,
    supported,
    error,
    clearError: () => setError(null),
    start,
    stop,
  };
}
