# HealEasy

**AI-Powered Pre-Consultation and Clinical Documentation Assistant**

HealEasy is an AI-assisted healthcare platform designed to streamline the patient pre-consultation process and reduce the documentation workload for healthcare professionals. The system converts patient-reported symptoms into structured information, assists with follow-up questioning, generates doctor-ready summaries, and produces structured clinical documentation from consultation notes.

---

## Overview

Healthcare consultations often involve time-consuming patient intake, communication difficulties, and repetitive clinical documentation. HealEasy addresses these challenges by introducing an AI-assisted workflow between patients and doctors.

### Core Workflow

```text
Patient Registration
        ↓
Hospital Selection
        ↓
Voice / Text Symptom Input
        ↓
AI Follow-up Questions
        ↓
Patient Responses
        ↓
AI-Generated Doctor Summary
        ↓
Doctor Consultation
        ↓
Consultation Transcript / Notes
        ↓
AI-Generated Case Sheet
        ↓
Doctor Review
```

---

## Key Features

### Patient Module

* Patient registration and login
* Hospital selection
* Voice-based symptom input
* Text-based symptom input
* AI-generated follow-up questions
* Patient response collection
* AI-generated consultation summary

### Doctor Module

* Doctor consultation interface
* Patient information and consultation summary
* Voice-based consultation input
* Consultation notes and transcript
* AI-generated clinical case sheet
* Reviewable structured documentation

### AI Capabilities

* Natural language understanding
* Context-aware follow-up questioning
* Patient information summarization
* Speech-to-text interaction
* Structured clinical documentation generation

---

## Technology Stack

| Layer       | Technologies                         |
| ----------- | ------------------------------------ |
| Frontend    | React.js, JavaScript, Tailwind CSS   |
| Backend     | Node.js, Express.js                  |
| AI          | Google Gemini API                    |
| Voice       | Web Speech API                       |
| Database    | Amazon DynamoDB                      |
| API         | REST                                 |
| Development | Git, GitHub, VS Code, Thunder Client |

---

## System Architecture

```text
                    ┌─────────────────┐
                    │     Patient     │
                    │   React Client  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  REST API Layer │
                    │ Node.js/Express │
                    └───────┬─┬───────┘
                            │ │
              ┌─────────────┘ └──────────────┐
              ▼                              ▼
      ┌─────────────────┐          ┌─────────────────┐
      │    DynamoDB     │          │   Gemini API    │
      │     Storage     │          │   AI Services   │
      └─────────────────┘          └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │      Doctor     │
                                   │   Consultation  │
                                   └─────────────────┘
```

---

## API Endpoints

| Method | Endpoint             | Purpose                      |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/patients`      | Create patient               |
| GET    | `/api/hospitals`     | Retrieve hospitals           |
| POST   | `/api/consultations` | Create consultation          |
| POST   | `/api/ai/followup`   | Generate follow-up questions |
| POST   | `/api/ai/summary`    | Generate doctor summary      |
| POST   | `/api/ai/casesheet`  | Generate case sheet          |
| GET    | `/api/health`        | Backend health check         |

---

## Project Structure

```text
HealEasy/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── controllers/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## Local Development

### Prerequisites

* Node.js
* npm
* Git
* Google Gemini API key
* AWS account with required DynamoDB configuration

### Clone

```bash
git clone <repository-url>
cd HealEasy
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

```env
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGIN=http://localhost:5173
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:5000
```

Do not commit `.env` files or API keys to the repository.

---

## Research & Development

The development of HealEasy was guided by research into digital health, artificial intelligence in healthcare, speech-based interfaces, and AI-assisted clinical documentation.

* World Health Organization — Digital Health
  http://www.who.int/health-topics/digital-health

* World Health Organization — Artificial Intelligence for Health
  http://www.who.int/teams/digital-health-and-innovation/harnessing-artificial-intelligence-for-health

* World Health Organization — Ethics and Governance of AI for Health
  http://www.who.int/publications/i/item/9789240029200

---

## Expected Impact

### Patients

* Simplified symptom reporting
* Reduced communication difficulties
* More structured pre-consultation
* Easier navigation through the consultation process

### Doctors

* Structured patient information before consultation
* Reduced repetitive documentation
* Faster preparation of clinical notes
* More time for patient interaction

### Healthcare Organizations

* Improved consultation workflow
* Better organization of patient information
* Reduced administrative workload
* Potential improvement in operational efficiency

---

## Future Scope

* Multilingual Indian-language voice interaction
* Real-time consultation transcription
* Secure authentication and authorization
* Electronic Health Record integration
* Appointment and queue management
* Patient medical-history timeline
* Mobile application
* Scalable cloud deployment
* Domain-specific AI model optimization

---

## Responsible AI

HealEasy is an AI-assisted healthcare prototype. It is not intended to independently diagnose, prescribe treatment, or replace professional medical judgment.

AI-generated outputs should be reviewed and validated by qualified healthcare professionals before being used for clinical decisions.

The system is intended to support healthcare professionals by reducing repetitive information-processing and documentation tasks.

---

## Project Status

**Current Status:** Working Prototype / Hackathon MVP

The core workflow demonstrates:

```text
Patient Input
    ↓
AI Follow-up
    ↓
AI Summary
    ↓
Doctor Consultation
    ↓
AI Case Sheet
```

---

## Contributors

**HealEasy Team**
Artificial Intelligence and Data Science
Sri Manakula Vinayagar Engineering College

---

## License

This project is developed for educational, research, and hackathon purposes.
