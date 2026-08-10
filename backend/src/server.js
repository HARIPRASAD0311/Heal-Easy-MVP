require("dotenv").config();

const createApp = require("./app");

const PORT = process.env.PORT || 5000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`HealEasy backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
    console.warn(
      "WARNING: GEMINI_API_KEY is not set in .env — /api/ai/* endpoints will fail until it is configured."
    );
  }
});
