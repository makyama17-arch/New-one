export async function postToYouTube({
  accessToken,
  videoPath,
  title = "MAKYAMA",
  description = "",
  privacyStatus = "private"
}) {
  if (!accessToken) {
    throw new Error("YouTube account is not connected.");
  }

  if (!videoPath) {
    throw new Error("YouTube video file is required.");
  }

  /*
   * YouTube Data API v3 videos.insert integration will be
   * connected after Google OAuth credentials are configured.
   */

  return {
    ok: false,
    platform: "youtube",
    status: "not_configured",
    message: "YouTube OAuth/API authorization is required."
  };
}
