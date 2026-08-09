import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend/auth logic in this phase — just continue the flow.
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Back to home" }} />

      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-12 sm:px-8">
        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-muted">
          Set up your patient profile to begin a consultation.
        </p>

        <form onSubmit={handleSubmit} className="surface-card mt-8 w-full space-y-5">
          <div>
            <label className="field-label" htmlFor="fullName">Full name</label>
            <input id="fullName" type="text" placeholder="e.g. Ananya Sharma" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="phone">Phone number</label>
            <input id="phone" type="tel" placeholder="+91 90000 00000" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Create a password" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" placeholder="Re-enter your password" className="field-input" required />
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 text-base">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-clinical-700 hover:text-clinical-800">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
