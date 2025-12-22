require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));

module.exports = app;
