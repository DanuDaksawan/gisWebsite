require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Import routes
const markerRoutes = require("./routes/markerRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public (React build result)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/markers", markerRoutes);
app.use("/auth", authRoutes);

// Fallback: Serve index.html (for React Router SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 11062;
app.listen(PORT, () => {
  console.log(✅ Server running on http://localhost:${PORT});
});
