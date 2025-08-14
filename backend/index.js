import dotenv from "dotenv";
dotenv.config(); // ✅ Load env before anything else


import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import "./config/passport.js"; 
import feedbackRoutes from "./routes/feedbackRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/user.route.js";

// ✅ Now passport runs AFTER env is loaded

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/feedback", feedbackRoutes);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/contact", contactRoutes);

app.use("/api/profile", profileRoutes);

try {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB Connected");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

app.use(passport.initialize());
app.use("/api/users", userRoute);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
