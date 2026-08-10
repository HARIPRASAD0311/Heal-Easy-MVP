# HealEasy Backend

Node.js + Express backend for the HealEasy AI hospital assistant. It powers the
existing React frontend: patient registration, hospital selection, voice-captured
symptom intake, AI-generated follow-up questions, a doctor-ready pre-consultation
summary, and an AI-drafted case sheet from the consultation transcript.

No authentication, no database server, no cloud infrastructure — just Express
and a JSON file on disk, so it can be run and connected to the frontend in
minutes.

## Stack

- Node.js + Express (REST API)
- Google Gemini API (`@google/generative-ai`) for all AI generation
- Simple JSON-file storage in `data/` (patients, hospitals, consultations) —
  no MongoDB/Mongo Atlas setup required
- CORS enabled for the Vite frontend dev server

## 1. Setup

```bash
cd healeasy-backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

```
PORT=5000
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Get a Gemini API key from https://aistudio.google.com/apikey. Every endpoint
except `/api/ai/*` works without a key; the AI endpoints will return a clear
`500` error telling you the key is missing until you add one.

## 2. Run

```bash
npm run dev     # nodemon, auto-restarts on file changes
# or
npm start       # plain node
```

You should see:

```
HealEasy backend running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

Point your React frontend's API base URL at `http://localhost:5000/api`.

## 3. Data storage

Three JSON files under `data/` act as the database:

- `data/hospitals.json` — pre-seeded with the three hospitals shown on the
  frontend's "Select Hospital" screen (Sunrise General Hospital, Lotus
  Multispecialty Clinic, Government OPD Center).
- `data/patients.json` — created on first patient registration.
- `data/consultations.json` — created on first consultation.

They're plain arrays of JSON objects, safe to open, inspect, or reset by
hand (just leave them as `[]` for patients/consultations to start fresh).
This is intentionally simple for a prototype; swapping in MongoDB later
would only mean rewriting the three files in `src/models/`.

## 4. Workflow this backend implements

1. Patient registers → `POST /api/patients`
2. Patient selects a hospital → `GET /api/hospitals` (frontend picks one)
3. Patient's voice-to-text symptoms are recorded → `POST /api/consultations`
4. Backend asks Gemini for follow-up questions → `POST /api/ai/followup`
5. Patient answers, backend asks Gemini for a summary → `POST /api/ai/summary`
6. Doctor views the summary → `GET /api/consultations/:id`
7. Doctor's consultation transcript is sent to Gemini → `POST /api/ai/casesheet`
8. Doctor reviews/edits the case sheet → `PUT /api/consultations/:id/casesheet`
9. Patient can retrieve past consultations → `GET /api/patients/:id/consultations`

## 5. API reference

All responses are JSON. Errors look like `{ "error": "message" }` with an
appropriate HTTP status code (400 validation, 404 not found, 500 server/AI
error, 502 bad AI response).

### Health

```
GET /api/health
→ { "status": "ok", "timestamp": "..." }
```

### Patients

```
POST /api/patients
Body: { "fullName", "email", "phone", "age", "gender" }
→ 201, created patient { patientId, fullName, email, phone, age, gender, createdAt }

GET /api/patients/:id
→ 200, patient object, or 404

GET /api/patients/:id/consultations
→ 200, array of that patient's consultations (newest first), or 404 if patient doesn't exist
```

### Hospitals

```
GET /api/hospitals
→ 200, array of { hospitalId, name, location, wait }
```

### Consultations

```
POST /api/consultations
Body: { "patientId", "hospitalId", "symptoms" }
→ 201, created consultation record (see shape below)

GET /api/consultations/:id
→ 200, consultation object, or 404

PUT /api/consultations/:id/casesheet
Body: { "caseSheet": { chiefComplaint, historyOfPresentIllness, examinationFindings, assessment, plan } }
→ 200, updated consultation (merges into existing caseSheet, sets status to "completed")
```

Consultation shape:

```json
{
  "consultationId": "uuid",
  "patientId": "uuid",
  "hospitalId": "hosp-sunrise-general",
  "symptoms": "string",
  "followUpQuestions": ["string", "..."],
  "followUpAnswers": ["string", "..."],
  "doctorSummary": { "chiefComplaint": "...", "...": "..." },
  "doctorTranscript": "string or null",
  "caseSheet": { "chiefComplaint": "...", "...": "..." },
  "status": "symptoms_recorded | followup_ready | summary_ready | case_sheet_ready | completed",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### AI (Gemini-powered)

All three AI endpoints accept an optional `consultationId`. If given, the
result is also saved onto that consultation record and its `status` is
updated; if omitted, they just run statelessly on whatever you pass in.

```
POST /api/ai/followup
Body: { "consultationId" }                      // uses the consultation's stored symptoms
   or { "symptoms": "raw patient text" }         // stateless, no consultation needed
→ 200, { "questions": ["...", "..."], "consultation": {...} | null }

POST /api/ai/summary
Body: { "consultationId", "followUpAnswers": ["...", "..."] }
   or { "symptoms", "followUpQuestions", "followUpAnswers" }
→ 200, { "summary": { chiefComplaint, duration, severity, associatedSymptoms,
                       medicationTaken, relevantHistory, additionalNotes },
          "consultation": {...} | null }

POST /api/ai/casesheet
Body: { "consultationId", "transcript" }
   or { "transcript", "doctorSummary", "symptoms" }
→ 200, { "caseSheet": { chiefComplaint, historyOfPresentIllness,
                         examinationFindings, assessment, plan },
          "consultation": {...} | null }
```

### AI safety behavior

The prompts sent to Gemini (see `src/services/geminiService.js`) explicitly
instruct the model to:

- Only use information actually provided — never invent symptoms, answers, or history
- Mark any missing field as the literal string `"Not provided"`
- Never state a definitive diagnosis (only hedged, non-definitive impressions in the `assessment` field)
- Never name specific medications, dosages, or drug classes
- Return strict JSON only, which the backend parses and validates

## 6. Example end-to-end curl walkthrough

```bash
# 1. Register a patient
curl -s -X POST http://localhost:5000/api/patients \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ananya Sharma","email":"ananya@example.com","phone":"+91 90000 00000","age":27,"gender":"female"}'

# 2. List hospitals, pick one
curl -s http://localhost:5000/api/hospitals

# 3. Create a consultation with symptoms
curl -s -X POST http://localhost:5000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{"patientId":"<id>","hospitalId":"hosp-sunrise-general","symptoms":"Headache and mild fever for 2 days, worse in the evening"}'

# 4. Get AI follow-up questions (saves onto the consultation)
curl -s -X POST http://localhost:5000/api/ai/followup \
  -H "Content-Type: application/json" \
  -d '{"consultationId":"<consultationId>"}'

# 5. Submit answers, get AI summary
curl -s -X POST http://localhost:5000/api/ai/summary \
  -H "Content-Type: application/json" \
  -d '{"consultationId":"<consultationId>","followUpAnswers":["2 days","6 out of 10","Took paracetamol once"]}'

# 6. Doctor sends transcript, gets AI case sheet
curl -s -X POST http://localhost:5000/api/ai/casesheet \
  -H "Content-Type: application/json" \
  -d '{"consultationId":"<consultationId>","transcript":"Doctor: ... Patient: ..."}'

# 7. Doctor edits and saves the case sheet
curl -s -X PUT http://localhost:5000/api/consultations/<consultationId>/casesheet \
  -H "Content-Type: application/json" \
  -d '{"caseSheet":{"plan":"Rest and hydration, review in 3 days"}}'

# 8. Patient looks up their consultation history
curl -s http://localhost:5000/api/patients/<patientId>/consultations
```

## 7. Notes / limitations (by design, for this MVP)

- No authentication — anyone with the URL can call any endpoint, matching the
  "no auth for MVP" requirement.
- Storage is a flat JSON file, fine for a single-process prototype; it is not
  safe for concurrent multi-process writes. Swap in MongoDB later if needed
  by rewriting `src/models/*.js` — routes and controllers won't need to change.
- The AI endpoints require a real `GEMINI_API_KEY`. Without one they fail
  fast with a clear `500` error rather than silently returning fake data.
