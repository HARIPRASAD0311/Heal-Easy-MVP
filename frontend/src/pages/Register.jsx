import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Spinner from "../components/Spinner.jsx";
import Toast from "../components/Toast.jsx";
import { registerPatient } from "../services/api.js";
import { useSession } from "../context/SessionContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { update } = useSession();

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", age: "", gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await registerPatient({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        age: Number(form.age),
        gender: form.gender,
      });
      const patientId = data.patientId;
      console.log("[Register] Patient created. patientId:", patientId);
      update({ patientId });
      navigate("/select-hospital");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Back to home" }} />

      {error && <Toast message={error} onClose={() => setError(null)} />}

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
            <input id="fullName" type="text" value={form.fullName}
              onChange={set("fullName")} placeholder="e.g. Ananya Sharma"
              className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email}
              onChange={set("email")} placeholder="you@example.com"
              className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="phone">Phone number</label>
            <input id="phone" type="tel" value={form.phone}
              onChange={set("phone")} placeholder="+91 90000 00000"
              className="field-input" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="age">Age</label>
              <input id="age" type="number" min="1" max="120" value={form.age}
                onChange={set("age")} placeholder="e.g. 27"
                className="field-input" required />
            </div>
            <div>
              <label className="field-label" htmlFor="gender">Gender</label>
              <select id="gender" value={form.gender} onChange={set("gender")}
                className="field-input" required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
            {loading && <Spinner size={18} />}
            {loading ? "Creating account…" : "Create Account"}
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
