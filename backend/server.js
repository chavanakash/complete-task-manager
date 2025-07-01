const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Auth routes (login/signup)
app.use("/api/auth", authRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
