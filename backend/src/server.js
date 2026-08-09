require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRoutes);

// Error handling (must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
