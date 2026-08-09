import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-clinical-50">
      <header className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8">
        <Logo />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-clinical-100 bg-white px-4 py-1.5 text-sm font-medium text-clinical-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-pulse-500" />
          AI-powered pre-consultation
        </span>

        <h1 className="font-display text-4xl font-extrabold leading-tight text-clinical-900 sm:text-5xl">
          Talk before you wait.
          <br />
          <span className="text-clinical-600">Let HealEasy brief your doctor.</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-muted">
          HealEasy listens to your symptoms in your own language, asks smart
          follow-up questions, and prepares a clear, doctor-ready summary —
          before you ever sit down in the consultation room.
        </p>

        <div className="mt-10 grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
          <Link to="/register" className="btn-primary w-full py-4 text-base">
            I'm a Patient
          </Link>
          <Link to="/doctor-login" className="btn-secondary w-full py-4 text-base">
            I'm a Doctor
          </Link>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Multilingual intake", desc: "Speak naturally, in the language you're comfortable with." },
            { title: "Guided follow-up", desc: "Smart questions fill the gaps a doctor would ask anyway." },
            { title: "Doctor-ready summary", desc: "A structured brief that saves consultation time." },
          ].map((f) => (
            <div key={f.title} className="surface-card text-left">
              <h3 className="font-display text-base font-bold text-clinical-800">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-clinical-100 py-6 text-center text-sm text-muted">
        HealEasy — built for faster, clearer consultations.
      </footer>
    </div>
  );
}
