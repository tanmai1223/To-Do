const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routers = require("./routes/todo");
const dotenv= require("dotenv");
const cors=require("cors")

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors({
  origin: "https://todocic.netlify.app", // React app URL
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization'],             // only if you're using cookies
}));

app.use(bodyParser.json());

app.use("/todo", routers);


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
