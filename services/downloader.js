import fs from "fs/promises";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import ytdlp from "yt-dlp-exec";

const TEMP_DIR = path.join(os.tmpdir(), "makyama-auto-poster");

async function ensureTempDir() {
  await fs.mkdir(TEMP_DIR, { recursive: true });
}

function detectPlatform(url) {
  const value = url.toLowerCase();

  if (value.includes("youtube.com") || value.includes("youtu.be")) {
    return "youtube";
  }

  if (value.includes("facebook.com") || value.includes("fb.watch")) {
    return "facebook";
  }

  if (value.includes("instagram.com")) {
    return "instagram";
  }

  if (value.includes("tiktok.com")) {
    return "tiktok";
  }

  return "unknown";
}

export async function downloadVideo(url) {
  if (!url || typeof url !== "string") {
    throw new Error("Video URL is required.");
  }

  let parsed;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid video URL.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP/HTTPS URLs are supported.");
  }

  await ensureTempDir();

  const id = randomUUID();
  const outputTemplate = path.join(TEMP_DIR, `${id}.%(ext)s`);

  await ytdlp(url, {
    output: outputTemplate,
    noPlaylist: true,
    format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
    mergeOutputFormat: "mp4"
  });

  const files = await fs.readdir(TEMP_DIR);

  const matches = files.filter((file) =>
    file.startsWith(id + ".")
  );

  if (!matches.length) {
    throw new Error("Video download failed.");
  }

  const filePath = path.join(TEMP_DIR, matches[0]);

  const stat = await fs.stat(filePath);

  return {
    filePath,
    fileName: matches[0],
    size: stat.size,
    sourcePlatform: detectPlatform(url)
  };
}

export async function deleteDownloadedVideo(filePath) {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch {
    // File may already be deleted.
  }
}
