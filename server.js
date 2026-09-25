import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 10000;

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "MAKYAMA AUTO POSTER",
    status: "online",
    time: new Date().toISOString()
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    facebook: {
      connected: false
    },
    instagram: {
      connected: false
    },
    youtube: {
      connected: false
    },
    tiktok: {
      connected: false
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    ok: false,
    error: "Internal server error"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("=================================");
  console.log("   MAKYAMA AUTO POSTER");
  console.log("=================================");
  console.log(`Server running on port ${PORT}`);
});
