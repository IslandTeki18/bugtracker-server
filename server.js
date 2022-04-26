import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware";
// Imported routes
import userRoutes from "./src/api/userRoutes.js";
import bugRoutes from "./src/api/bugRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

// app.use routes
app.use("/api/users", userRoutes);
app.use("/api/bugs", bugRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
