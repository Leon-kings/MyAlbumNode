const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((error) => {
  console.log("❌ MongoDB connection failed:", error.message);
});

/* Routes */
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});