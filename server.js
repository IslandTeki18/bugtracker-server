import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/error.middleware.js";
// Imported routes
import userApi from "./src/api/user.api.js";
import bugApi from "./src/api/bug.api.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

// app.use routes
app.use("/api/users", userApi);
app.use("/api/bugs", bugApi);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
