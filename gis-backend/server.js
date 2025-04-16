require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Import routes
const markerRoutes = require("./routes/markerRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ tambahkan ini

// Middleware
app.use(cors());
app.use(express.json());

// Route registrations
app.use("/api/markers", markerRoutes);
app.use("/auth", authRoutes); // ✅ daftarkan route login & register di sini

// Default 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
