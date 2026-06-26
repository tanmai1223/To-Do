const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routers = require("./routes/todo");
const dotenv= require("dotenv");

dotenv.config();

const app = express();

// Parse JSON
app.use(bodyParser.json());

// Serve React static files
app.use(express.static(path.join(__dirname, "dist")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API endpoint for todo
app.use("/todo", routers);

// Serve React frontend for unmatched routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
