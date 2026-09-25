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

const PUBLIC_DIR = path.join(__dirname, "public");


// ======================================================
// SECURITY
// ======================================================

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(cors());


// ======================================================
// REQUEST BODY
// ======================================================

app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);


// ======================================================
// LOGGING
// ======================================================

app.use(morgan("combined"));


// ======================================================
// STATIC FILES
// ======================================================

app.use(
  express.static(PUBLIC_DIR)
);


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "MAKYAMA AUTO POSTER",
    status: "online",
    time: new Date().toISOString()
  });
});


// ======================================================
// ACCOUNT STATUS
// ======================================================

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


// ======================================================
// PRIVACY POLICY
// ======================================================

app.get("/privacy", (req, res) => {
  res.sendFile(
    path.join(
      PUBLIC_DIR,
      "privacy.html"
    )
  );
});


// ======================================================
// TERMS OF SERVICE
// ======================================================

app.get("/terms", (req, res) => {
  res.sendFile(
    path.join(
      PUBLIC_DIR,
      "terms.html"
    )
  );
});


// ======================================================
// HOME PAGE
// ======================================================

app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      PUBLIC_DIR,
      "index.html"
    )
  );
});


// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Page not found."
  });
});


// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error(
    "SERVER ERROR:",
    err
  );

  res.status(500).json({
    ok: false,
    error: "Internal server error."
  });
});


// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      "================================="
    );

    console.log(
      "     MAKYAMA AUTO POSTER"
    );

    console.log(
      "================================="
    );

    console.log(
      `Server running on port ${PORT}`
    );
  }
);
