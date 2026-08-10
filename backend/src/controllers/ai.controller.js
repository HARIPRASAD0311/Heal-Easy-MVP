const ApiError = require("../utils/ApiError");
const gemini = require("../services/geminiService");
const consultationsModel = require("../models/consultations.model");

/**
 * POST /api/ai/followup
 * Body: { consultationId?, symptoms? }
 * At least one of consultationId or symptoms must be given. If a
 * consultationId is given, the generated questions are saved onto it.
 */
async function followup(req, res) {
  const { consultationId } = req.body || {};
  let { symptoms } = req.body || {};

  let consultation = null;
  if (consultationId) {
    consultation = consultationsModel.getConsultationById(consultationId);
    if (!consultation) {
      throw new ApiError(404, `No consultation found with id ${consultationId}.`);
    }
    symptoms = symptoms || consultation.symptoms;
  }

  if (!symptoms || !String(symptoms).trim()) {
    throw new ApiError(400, "symptoms is required (directly, or via an existing consultationId).");
  }

  const questions = await gemini.generateFollowUpQuestions(symptoms);

  let updatedConsultation = consultation;
  if (consultation) {
    updatedConsultation = consultationsModel.updateConsultation(consultationId, {
      followUpQuestions: questions,
      status: consultationsModel.STATUS.FOLLOWUP_READY,
    });
  }

  res.json({ questions, consultation: updatedConsultation });
}

/**
 * POST /api/ai/summary
 * Body: { consultationId?, symptoms?, followUpQuestions?, followUpAnswers? }
 */
async function summary(req, res) {
  const { consultationId } = req.body || {};
  let { symptoms, followUpQuestions, followUpAnswers } = req.body || {};

  let consultation = null;
  if (consultationId) {
    consultation = consultationsModel.getConsultationById(consultationId);
    if (!consultation) {
      throw new ApiError(404, `No consultation found with id ${consultationId}.`);
    }
    symptoms = symptoms || consultation.symptoms;
    followUpQuestions = followUpQuestions || consultation.followUpQuestions;
  }

  if (!symptoms || !String(symptoms).trim()) {
    throw new ApiError(400, "symptoms is required (directly, or via an existing consultationId).");
  }
  if (!Array.isArray(followUpAnswers)) {
    throw new ApiError(400, "followUpAnswers (array) is required.");
  }

  const doctorSummary = await gemini.generateSummary({
    symptoms,
    followUpQuestions: followUpQuestions || [],
    followUpAnswers,
  });

  let updatedConsultation = consultation;
  if (consultation) {
    updatedConsultation = consultationsModel.updateConsultation(consultationId, {
      followUpQuestions: followUpQuestions || consultation.followUpQuestions,
      followUpAnswers,
      doctorSummary,
      status: consultationsModel.STATUS.SUMMARY_READY,
    });
  }

  res.json({ summary: doctorSummary, consultation: updatedConsultation });
}

/**
 * POST /api/ai/casesheet
 * Body: { consultationId?, transcript, doctorSummary?, symptoms? }
 */
async function casesheet(req, res) {
  const { consultationId } = req.body || {};
  let { transcript, doctorSummary, symptoms } = req.body || {};

  let consultation = null;
  if (consultationId) {
    consultation = consultationsModel.getConsultationById(consultationId);
    if (!consultation) {
      throw new ApiError(404, `No consultation found with id ${consultationId}.`);
    }
    doctorSummary = doctorSummary || consultation.doctorSummary;
    symptoms = symptoms || consultation.symptoms;
  }

  if (!transcript || !String(transcript).trim()) {
    throw new ApiError(400, "transcript is required.");
  }

  const caseSheet = await gemini.generateCaseSheet({ transcript, doctorSummary, symptoms });

  let updatedConsultation = consultation;
  if (consultation) {
    updatedConsultation = consultationsModel.updateConsultation(consultationId, {
      doctorTranscript: transcript,
      caseSheet,
      status: consultationsModel.STATUS.CASE_SHEET_READY,
    });
  }

  res.json({ caseSheet, consultation: updatedConsultation });
}

module.exports = {
  followup,
  summary,
  casesheet,
};
